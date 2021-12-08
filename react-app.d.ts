/// <reference types="react-scripts" />

declare module 'crt-terminal' {
  interface Options {
    prompt?: () => string;
    banner?: string;
    buflen?: number;
    tickrate?: number;
    callback?: (enteredString: string) => void;
    root: HTMLDivElement;
  }

  interface ITerminalObject {
    focus: () => NodeJS.Timeout;
    parse: (str: any) => void;
    clear: () => string;
    print: (output: any, center: any) => void;
    destroy: () => void;
    inputLock: (lock: any) => any;
    setLoading: (status: boolean) => void;
  }

  // eslint-disable-next-line
  export const terminal: (opts: Options) => ITerminalObject;
}

interface Window {
  ethereum?: {
    isMetaMask?: true;
    on?: (...args: any[]) => void;
    enable?: () => Promise<any>;
    removeListener?: (...args: any[]) => void;
    request?: (arg: { method: string; params?: any[] | undefined }) => Promise<any>;
    autoRefreshOnNetworkChange?: boolean;
    networkVersion?: string;
  };
  web3?: Record<string, unknown>;
}
