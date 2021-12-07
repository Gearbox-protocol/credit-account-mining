import { utils } from 'ethers';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';

const { isAddress, getAddress } = utils;

const connectMetamask = async () => {
  if (!window.ethereum || !window.ethereum!.isMetaMask) {
    throw new TerminalError({ code: 'NO_METAMASK' });
  }

  let accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });
  if (!accounts) {
    accounts = await window.ethereum.enable!();
  }
  if (!accounts) {
    throw new TerminalError({ code: 'METAMASK_RELOGIN' });
  }

  const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK;
  if (!network) {
    throw new TerminalError({ code: 'NO_GEARBOX_NETWORK' });
  }

  if (window.ethereum.networkVersion !== network) {
    throw new TerminalError({ code: 'METAMASK_WRONG_NETWORK' });
  }

  const account = accounts[0];
  if (!isAddress(account)) {
    throw new TerminalError({ code: 'GET_ADDRESS_FAILED' });
  }

  return getAddress(account);
};

export default connectMetamask;
