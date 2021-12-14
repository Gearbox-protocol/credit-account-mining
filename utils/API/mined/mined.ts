import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
import { IClaimObject } from 'utils/API/join/join';
import { distributorInfo, network } from 'config/config';

const countClaims = async (claimObj: Partial<IClaimObject>) => {
  if (!window.ethereum || !window.ethereum!.isMetaMask) {
    throw new TerminalError({ code: 'NO_METAMASK' });
  }
  if (window.ethereum.networkVersion !== network) {
    throw new TerminalError({ code: 'METAMASK_WRONG_NETWORK' });
  }

  const { contract } = distributorInfo;
  const {
    provider = new ethers.providers.Web3Provider(window.ethereum),
    signer = provider.getSigner(),
    miningAccount = <AccountMining>AccountMining__factory.connect(contract, signer),
  } = claimObj;

  const query = await miningAccount.queryFilter(miningAccount.filters.Claimed());

  const claimObject: IClaimObject = {
    miningAccount,
    provider,
    signer,
  };
  return [claimObject, query.length];
};

export default countClaims;
