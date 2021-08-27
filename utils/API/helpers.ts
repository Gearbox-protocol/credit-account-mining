import { errors } from 'utils/terminalText';

const checkMetamask = (): boolean => {
  if (typeof (window as any).ethereum !== 'undefined' && (window as any).ethereum.isMetaMask) {
    return true;
  }
  throw new Error(errors.noMetamask);
};

const connectMetamask = async () => {
  try {
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  } catch (e) {
    if (e.code === -32002) {
      throw new Error(errors.metamaskLogin);
    }
    throw new Error(errors.metamaskNotConnected);
  }
};

const checkNetwork = () => {
  if ((window as any).ethereum.networkVersion !== '1') {
    throw new Error(errors.metamaskWrongNetwork);
  }
};

export { checkMetamask, connectMetamask, checkNetwork };
