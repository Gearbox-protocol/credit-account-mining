import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { errors } from 'utils/text/terminalText';
import { salt } from 'utils/helpers/helpers';
import { usersList, IAccount } from 'utils/allowedUsers/allowedUsers';

interface IMetamaskError {
  code: number;
  message: string;
}

const connectMetamask = async () => {
  try {
    /* add subscription !!!!!!!!!!!!! */
    /* accounts enable !!!!!!!!!!! */
    if (!window.ethereum || !window.ethereum!.isMetaMask) throw new Error(errors.noMetamask);

    const accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });

    const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK;
    if (!network) throw new Error(errors.gearboxNetwork);
    if (window.ethereum.networkVersion !== network) throw new Error(errors.metamaskWrongNetwork);

    return accounts;
  } catch (e: any) {
    const typedError = e as IMetamaskError;

    if (typedError.code === 4001) throw new Error(errors.metamaskNotConnected);
    if (typedError.code === -32002) throw new Error(errors.metamaskLogin);
    throw new Error(typedError.message);
  }
};

const checkPermissions = (account: string): [IAccount, number] => {
  if (!(account in usersList)) throw new Error(errors.permissionDenied);
  return [usersList[account], 1];
};

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  account: IAccount;
  address: string;
}

const isClaimed = async (address: string, account: IAccount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum!);
    const signer = provider.getSigner();
    const miningAccount: AccountMining = await AccountMining__factory.connect(address, signer);

    const claimed = await miningAccount.isClaimed(account.index);
    if (claimed) throw new Error(errors.alreadyClaimed);

    const claimObject: IClaimObject = {
      miningAccount, provider, signer, account, address,
    };
    return claimObject;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const claim = async ({ miningAccount, account, address }: IClaimObject) => {
  try {
    const res = await miningAccount.claim(
      account.index,
      address,
      salt(account.index, address),
      account.merklePath,
    );
    await res.wait();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const waitTransactionEnd = async (transaction: ethers.ContractTransaction) => {
  try {
    await transaction.wait();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export type { IClaimObject };
export {
  connectMetamask, checkPermissions, isClaimed, claim, waitTransactionEnd,
};
