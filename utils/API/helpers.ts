import {
  errorMetamaskLogin,
  errorMetamaskNotConnected,
  errorMetamaskWrongNetwork,
  errorNoMetamask,
} from 'utils/messages';

const checkMetamask = (): boolean => {
  if (typeof (window as any).ethereum !== 'undefined' && (window as any).ethereum.isMetaMask) {
    return true;
  }
  throw new Error(errorNoMetamask);
};

const connectMetamask = async () => {
  try {
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  } catch (e) {
    if (e.code === -32002) {
      throw new Error(errorMetamaskLogin);
    }
    throw new Error(errorMetamaskNotConnected);
  }
};

const checkNetwork = () => {
  if ((window as any).ethereum.networkVersion !== '1') {
    throw new Error(errorMetamaskWrongNetwork);
  }
};

export { checkMetamask, connectMetamask, checkNetwork };
