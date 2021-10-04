import { TerminalError, TerminalErrorCodes } from './TerminalError/TerminalError';

interface IMetamaskError {
  code: number;
  message: string;
}

type KnownMetamaskErrors = Extract<TerminalErrorCodes, 'METAMASK_RELOGIN' | 'DENIED_BY_USER'>;

const MetamaskDictionary: Record<number, KnownMetamaskErrors> = {
  [-32002]: 'METAMASK_RELOGIN',
  [-32603]: 'DENIED_BY_USER',
  4001: 'DENIED_BY_USER',
};

const isTerminalError = (e: any): e is TerminalError => e instanceof TerminalError;

const isMetamaskError = (e: any): e is IMetamaskError => {
  if (!e) return false;
  if (typeof e !== 'object') return false;
  if (typeof e.code !== 'number' || typeof e.message !== 'string') return false;
  return true;
};

const processMetamaskError = (e: IMetamaskError): TerminalError => {
  const terminalCode = MetamaskDictionary[e.code];
  return terminalCode
    ? new TerminalError({ code: terminalCode, name: 'Metamask error' })
    : new TerminalError({
        code: 'UNEXPECTED_ERROR',
        name: 'Metamask error',
      });
};

const getTypedError = (e: any): TerminalError => {
  if (isTerminalError(e)) return e;
  if (isMetamaskError(e)) return processMetamaskError(e);

  return new TerminalError({ code: 'UNEXPECTED_ERROR' });
};

const assertError = (condition: boolean, code: TerminalErrorCodes): boolean => {
  if (condition) throw new TerminalError({ code });
  return false;
};

export type { IMetamaskError };
export { getTypedError, assertError };
