import { store } from 'redux/store';
import { setClaimObject } from 'redux/terminalApp/terminalAppAction';
import { controllerGotoRoot } from 'redux/terminalController/terminalControllerActions';
import { print } from 'redux/terminal/terminalAction';
import { TerminalError, TerminalErrorCodes } from 'utils/API/errors/terminal-error';
import { errorStrings } from 'utils/text/terminalText';

interface IMetamaskSubscription {
  resetStatus: () => void;
  subscribeChanges: () => void;
  unSubscribeChanges: () => void;
  checkStatus(): boolean;
}

class MetamaskSubscription implements IMetamaskSubscription {
  private accountChanged: boolean;

  private chainChanged: boolean;

  private disconnected: boolean;

  private subscribed: boolean;

  constructor() {
    this.accountChanged = false;
    this.chainChanged = false;
    this.disconnected = false;
    this.subscribed = false;
  }

  private handleChainChange = () => {
    this.chainChanged = true;
    store.dispatch(setClaimObject(null));
    store.dispatch(print({ msg: errorStrings.CHAIN_CHANGED, center: false }));
    store.dispatch(controllerGotoRoot());
  };

  private handleDisconnect = () => {
    this.disconnected = true;
    store.dispatch(setClaimObject(null));
    store.dispatch(print({ msg: errorStrings.DISCONNECTED, center: false }));
    store.dispatch(controllerGotoRoot());
  };

  private handleAccountChange = () => {
    this.accountChanged = true;
    store.dispatch(setClaimObject(null));
    store.dispatch(print({ msg: errorStrings.ACCOUNT_CHANGED, center: false }));
    store.dispatch(controllerGotoRoot());
  };

  resetStatus = () => {
    this.accountChanged = false;
    this.chainChanged = false;
    this.disconnected = false;
  };

  checkStatus(): boolean {
    if (this.accountChanged) throw new TerminalError({ code: TerminalErrorCodes.ACTION_ABORTED });
    if (this.chainChanged) throw new TerminalError({ code: TerminalErrorCodes.ACTION_ABORTED });
    if (this.disconnected) throw new TerminalError({ code: TerminalErrorCodes.ACTION_ABORTED });
    return true;
  }

  subscribeChanges = () => {
    this.resetStatus();

    if (this.subscribed) return;
    this.subscribed = true;
    window.ethereum!.on!('disconnect', this.handleDisconnect);
    window.ethereum!.on!('accountsChanged', this.handleAccountChange);
    window.ethereum!.on!('chainChanged', this.handleChainChange);
  };

  unSubscribeChanges = () => {
    window.ethereum!.removeListener!('connect', this.handleDisconnect);
    window.ethereum!.removeListener!('accountsChanged', this.handleAccountChange);
    window.ethereum!.removeListener!('chainChanged', this.handleChainChange);
    this.resetStatus();
    this.subscribed = false;
  };
}

export type { IMetamaskSubscription };
export { MetamaskSubscription };
