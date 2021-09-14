import { TerminalError, TerminalErrorCodes } from 'utils/API/errors/terminal-error';

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

export type { IMetamaskSubscription };
export { MetamaskSubscription };
