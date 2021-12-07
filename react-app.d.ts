/// <reference types="react-scripts" />

declare module 'crt-terminal';

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
