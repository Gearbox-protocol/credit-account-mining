import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { IClaimObject } from 'utils/API/join/join';
import distributorInfo from 'utils/accounts/distributor-info';

const countClaims = async (claimObj: Partial<IClaimObject>) => {
  const { contract } = distributorInfo;
  const {
    provider = new ethers.providers.Web3Provider(window.ethereum!),
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
