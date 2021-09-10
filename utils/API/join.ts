import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers, utils } from 'ethers';
import { errors } from 'utils/text/terminalText';
import distributorInfo from 'utils/accounts/distributor-info';
import { MerkleDistributorInfo } from 'utils/merkle/parse-accounts';

const { isAddress, getAddress } = utils;

type Claims = MerkleDistributorInfo['claims']['string'];

interface IMetamaskError {
  code: number;
  message: string;
}

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  claims: Claims;
  address: string;
}

interface IMetamaskSubscription {
  accountChanged: boolean;
  chainChanged: boolean;
  disconnected: boolean;
  subscribeChanges: () => void;
  unSubscribeChanges: () => void;
  checkStatus(): boolean;
}

class MetamaskSubscription implements IMetamaskSubscription {
  accountChanged: boolean;

  chainChanged: boolean;

  disconnected: boolean;

  constructor() {
    this.accountChanged = false;
    this.chainChanged = false;
    this.disconnected = false;
  }

  private handleChainChange = () => {
    this.chainChanged = true;
  };

  private handleDisconnect = () => {
    this.disconnected = true;
  };

  private handleAccountChange = () => {
    this.accountChanged = true;
  };

  private resetStatus = () => {
    this.accountChanged = false;
    this.chainChanged = false;
    this.disconnected = false;
  };

  checkStatus(): boolean {
    if (this.accountChanged) throw new Error(errors.accountChanged);
    if (this.chainChanged) throw new Error(errors.chainChanged);
    if (this.disconnected) throw new Error(errors.disconnected);
    return true;
  }

  subscribeChanges = () => {
    this.resetStatus();
    window.ethereum!.on!('disconnect', this.handleDisconnect);
    window.ethereum!.on!('accountsChanged', this.handleAccountChange);
    window.ethereum!.on!('chainChanged', this.handleChainChange);
  };

  unSubscribeChanges = () => {
    window.ethereum!.removeListener!('connect', this.handleDisconnect);
    window.ethereum!.removeListener!('accountsChanged', this.handleAccountChange);
    window.ethereum!.removeListener!('chainChanged', this.handleChainChange);
    this.resetStatus();
  };
}

const connectMetamask = async () => {
  try {
    if (!window.ethereum || !window.ethereum!.isMetaMask) throw new Error(errors.noMetamask);

    let accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });
    if (!accounts) {
      accounts = await window.ethereum.enable!();
    }
    if (!accounts) throw new Error(errors.metamaskLogin);

    const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK;
    if (!network) throw new Error(errors.gearboxNetwork);
    if (window.ethereum.networkVersion !== network) throw new Error(errors.metamaskWrongNetwork);

    const account = accounts[0];
    if (!isAddress(account)) throw new Error(errors.metamaskAddress);

    return getAddress(account);
  } catch (e: any) {
    const typedError = e as IMetamaskError;

    if (typedError.code === 4001) throw new Error(errors.metamaskNotConnected);
    if (typedError.code === -32002) throw new Error(errors.metamaskLogin);
    throw new Error(typedError.message);
  }
};

const checkPermissions = (address: string): [Claims, number] => {
  if (!(address in distributorInfo.claims)) throw new Error(errors.permissionDenied);
  return [distributorInfo.claims[address], 1];
};

const isClaimed = async (address: string, claims: Claims) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum!);
    const signer = provider.getSigner();
    const miningAccount: AccountMining = await AccountMining__factory.connect(address, signer);

    const claimed = await miningAccount.isClaimed(claims.index);
    if (claimed) throw new Error(errors.alreadyClaimed);

    const claimObject: IClaimObject = {
      miningAccount,
      provider,
      signer,
      claims,
      address,
    };
    return claimObject;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const claim = async ({ miningAccount, claims, address }: IClaimObject) => {
  try {
    const res = await miningAccount.claim(claims.index, address, claims.salt, claims.proof);
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

export type { IClaimObject, IMetamaskSubscription, Claims };
export {
  connectMetamask,
  checkPermissions,
  isClaimed,
  claim,
  waitTransactionEnd,
  MetamaskSubscription,
};
