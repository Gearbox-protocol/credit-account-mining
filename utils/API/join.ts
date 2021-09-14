import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers, utils } from 'ethers';
import { ErrorHub } from 'utils/API/errors/error-hub';
import { TerminalError, TerminalErrorCodes } from 'utils/API/errors/terminal-error';
import distributorInfo from 'utils/accounts/distributor-info';
import { MerkleDistributorInfo } from 'utils/merkle/parse-accounts';

const { isAddress, getAddress } = utils;

type User = MerkleDistributorInfo['claims']['string'];

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  user: User;
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
    if (this.accountChanged) {
      throw new TerminalError({ code: TerminalErrorCodes.ACCOUNT_CHANGED });
    }
    if (this.chainChanged) {
      throw new TerminalError({ code: TerminalErrorCodes.CHAIN_CHANGED });
    }
    if (this.disconnected) {
      throw new TerminalError({ code: TerminalErrorCodes.DISCONNECTED });
    }
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
    if (!window.ethereum || !window.ethereum!.isMetaMask) {
      throw new TerminalError({ code: TerminalErrorCodes.NO_METAMASK });
    }

    let accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });
    if (!accounts) {
      accounts = await window.ethereum.enable!();
    }
    if (!accounts) {
      throw new TerminalError({ code: TerminalErrorCodes.METAMASK_RELOGIN });
    }

    const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK;
    if (!network) {
      throw new TerminalError({ code: TerminalErrorCodes.NO_GEARBOX_NETWORK });
    }

    if (window.ethereum.networkVersion !== network) {
      throw new TerminalError({ code: TerminalErrorCodes.METAMASK_WRONG_NETWORK });
    }

    const account = accounts[0];
    if (!isAddress(account)) {
      throw new TerminalError({ code: TerminalErrorCodes.GET_ADDRESS_FAILED });
    }

    return getAddress(account);
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

const checkPermissions = (address: string): [User, number] => {
  if (!(address in distributorInfo.claims)) {
    throw new TerminalError({ code: TerminalErrorCodes.PERMISSION_DENIED });
  }

  return [distributorInfo.claims[address], 1];
};

const isClaimed = async (user: User) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum!);
    const signer = provider.getSigner();
    const miningAccount: AccountMining = AccountMining__factory.connect(
      distributorInfo.contract,
      signer,
    );

    const claimed = await miningAccount.isClaimed(user.index);
    if (claimed) {
      throw new TerminalError({ code: TerminalErrorCodes.ALREADY_CLAIMED });
    }

    const claimObject: IClaimObject = {
      miningAccount,
      provider,
      signer,
      user,
    };
    return claimObject;
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

const claim = async ({ miningAccount, user: { index, salt, proof } }: IClaimObject) => {
  try {
    const res = await miningAccount.claim(index, salt, proof);
    await res.wait();
    return [res, res.hash];
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

const waitTransactionEnd = async (transaction: ethers.ContractTransaction) => {
  try {
    await transaction.wait();
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

export type { IClaimObject, IMetamaskSubscription, User };
export {
  connectMetamask,
  checkPermissions,
  isClaimed,
  claim,
  waitTransactionEnd,
  MetamaskSubscription,
};
