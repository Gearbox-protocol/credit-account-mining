import axios, { AxiosError } from 'axios';
import { TerminalError, TerminalErrorCodes } from './TerminalError/TerminalError';
import errorStrings from './TerminalError/error-strings';

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
  if (terminalCode) {
    return new TerminalError({ code: terminalCode, name: 'Metamask error' });
  }
  return new TerminalError({
    code: 'UNEXPECTED_ERROR',
    name: 'Metamask error',
  });
};

const processAxiosError = (e: AxiosError) => {
  if (e.response) {
    const { status } = e.response;

    if (status === 404) {
      return new TerminalError({
        code: 'REJECTED',
      });
    }
    if (status === 429) {
      return new TerminalError({
        code: 'ENDPOINT_IS_BUSY',
      });
    }
    return new TerminalError({
      code: 'UNEXPECTED_ERROR',
      details: `Response with status: ${e.response.status}`,
    });
  }
  if (e.request) {
    return new TerminalError({
      code: 'UNEXPECTED_ERROR',
      details: 'Request error',
    });
  }
  return new TerminalError({
    code: 'UNEXPECTED_ERROR',
    details: 'Unknown data fetching error',
  });
};

const getTypedError = (e: any): TerminalError => {
  if (isTerminalError(e)) return e;
  if (isMetamaskError(e)) return processMetamaskError(e);
  if (axios.isAxiosError(e)) return processAxiosError(e);

  return new TerminalError({ code: 'UNEXPECTED_ERROR', details: e.message });
};

export type { IMetamaskError };
export { getTypedError, errorStrings, TerminalError };
