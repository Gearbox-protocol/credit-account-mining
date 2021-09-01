/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    request?: (arg: { method: string; params?: any[] | undefined }) => Promise<any>;
    autoRefreshOnNetworkChange?: boolean;
    networkVersion?: string;
  };
  web3?: Record<string, unknown>;
}
