import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
import { distributorInfo, network } from 'config/config';

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
}

const makeClaim = async (claimObj: Partial<IClaimObject>) => {
  if (!window.ethereum || !window.ethereum!.isMetaMask) {
    throw new TerminalError({ code: 'NO_METAMASK' });
  }
  if (!window.ethereum.request) {
    throw new TerminalError({ code: 'METAMASK_WRONG_NETWORK' });
  }

  const chainId: string = await window.ethereum.request({ method: 'net_version' });
  if (chainId !== network) {
    throw new TerminalError({ code: 'METAMASK_WRONG_NETWORK' });
  }

  const { contract } = distributorInfo;
  const {
    provider = new ethers.providers.Web3Provider(window.ethereum),
    signer = provider.getSigner(),
    miningAccount = <AccountMining>AccountMining__factory.connect(contract, signer),
  } = claimObj;

  const claimObject: IClaimObject = {
    miningAccount,
    provider,
    signer,
  };
  return claimObject;
};

export type { IClaimObject };
export default makeClaim;
