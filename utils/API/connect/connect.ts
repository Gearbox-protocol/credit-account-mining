import { utils } from 'ethers';
import { ErrorHub } from 'utils/API/errors/error-hub';
import { TerminalError, TerminalErrorCodes } from 'utils/API/errors/terminal-error';

const { isAddress, getAddress } = utils;

const connectMetamask = async () => {
  try {
    if (!window.ethereum || !window.ethereum!.isMetaMask) {
      throw new TerminalError({ code: TerminalErrorCodes.NO_METAMASK });
    }

    let accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });
    if (!accounts) {
      accounts = await window.ethereum.enable!();
    }
    if (!accounts) {
      throw new TerminalError({ code: TerminalErrorCodes.METAMASK_RELOGIN });
    }

    const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK;
    if (!network) {
      throw new TerminalError({ code: TerminalErrorCodes.NO_GEARBOX_NETWORK });
    }

    if (window.ethereum.networkVersion !== network) {
      throw new TerminalError({ code: TerminalErrorCodes.METAMASK_WRONG_NETWORK });
    }

    const account = accounts[0];
    if (!isAddress(account)) {
      throw new TerminalError({ code: TerminalErrorCodes.GET_ADDRESS_FAILED });
    }

    return getAddress(account);
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

export default connectMetamask;
