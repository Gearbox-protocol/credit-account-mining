import { TerminalError, TerminalErrorCodes } from './terminal-error';

interface IMetamaskError {
  code: number;
  message: string;
}

type KnownMetamaskErrors =
  | TerminalErrorCodes.METAMASK_RELOGIN
  | TerminalErrorCodes.METAMASK_NOT_CONNECTED;

const MetamaskDictionary: Record<number, KnownMetamaskErrors> = {
  [-32002]: TerminalErrorCodes.METAMASK_RELOGIN,
  4001: TerminalErrorCodes.METAMASK_NOT_CONNECTED,
};

class ErrorHub {
  static isTerminalError = (e: any): e is TerminalError => e instanceof TerminalError;

  static isMetamaskError = (e: any): e is IMetamaskError => {
    if (!e) return false;
    if (typeof e !== 'object') return false;
    if (typeof e.code !== 'number' || typeof e.message !== 'string') return false;
    return true;
  };

  static processMetamaskError = (e: IMetamaskError): TerminalError => {
    const terminalCode = MetamaskDictionary[e.code];
    console.log(e);
    return terminalCode
      ? new TerminalError({ code: terminalCode, name: 'Metamask error' })
      : new TerminalError({
        code: TerminalErrorCodes.UNEXPECTED_ERROR,
        name: 'Metamask error',
      });
  };

  static getTypedError = (e: any): TerminalError => {
    if (this.isTerminalError(e)) return e;
    if (this.isMetamaskError(e)) return this.processMetamaskError(e);

    return new TerminalError({ code: TerminalErrorCodes.UNEXPECTED_ERROR });
  };
}

export type { IMetamaskError };
export { ErrorHub };
