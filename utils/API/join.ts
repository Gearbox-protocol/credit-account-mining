import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { errors } from 'utils/text/terminalText';
import usersList from 'utils/allowedUsers/allowedUsers';

interface IMetamaskError {
  code: number;
  message: string;
}

const checkMetamask = (): boolean => {
  /* add subscription !!!!!!!!!!!!! */
  /* accounts enable !!!!!!!!!!! */
  if (!window.ethereum || !window.ethereum!.isMetaMask) {
    throw new Error(errors.noMetamask);
  }
  return true;
};

const connectMetamask = async () => {
  try {
    const accounts = await window.ethereum!.request!({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (e: any) {
    const typedError = e as IMetamaskError;

    if (typedError.code === 4001) throw new Error(errors.metamaskNotConnected);
    if (typedError.code === -32002) throw new Error(errors.metamaskLogin);
    throw new Error(errors.metamaskNotConnected);
  }
};

const checkNetwork = (): boolean => {
  const [network] = [process.env.NEXT_PUBLIC_GEARBOX_NETWORK];

  if (!network) throw new Error(errors.gearboxNetwork);

  if (window.ethereum!.networkVersion !== network) {
    throw new Error(errors.metamaskWrongNetwork);
  }

  return true;
};

const checkPermissions = (user: string): boolean => {
  if (user in usersList) return true;
  throw new Error(errors.permissionDenied);
};

interface IAccount {
  account: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
}

const isClaimed = async (user: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum!);
    const signer = await provider.getSigner();
    const account: AccountMining = await AccountMining__factory.connect(user, signer);

    const claimed = false; // await account.isClaimed();!!!!!!!!!!!!!!!!!!!!
    if (claimed) throw new Error(errors.alreadyClaimed);

    return { account, provider, signer };
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const claim = async (account: IAccount) => {
  try {
    // account.account.claim('', user); !!!!!!!!!!!!!!!!!
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export type { IAccount };
export { checkMetamask, connectMetamask, checkNetwork, checkPermissions, isClaimed, claim };
