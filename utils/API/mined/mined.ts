import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { getTypedError } from 'utils/API/errors/error-hub';
import { IClaimObject } from 'utils/API/join/join';
import distributorInfo from 'utils/accounts/distributor-info';

const countClaims = async (claimObj: Partial<IClaimObject>) => {
  try {
    const { contract } = distributorInfo;
    let { provider, signer, miningAccount } = claimObj;

    provider = provider || new ethers.providers.Web3Provider(window.ethereum!);
    signer = signer || provider.getSigner();
    miningAccount = miningAccount || <AccountMining>AccountMining__factory.connect(contract, signer);

    const query = await miningAccount.queryFilter(miningAccount.filters.Claimed());

    const claimObject: IClaimObject = {
      miningAccount,
      provider,
      signer,
    };
    return [claimObject, query.length];
  } catch (e: any) {
    throw getTypedError(e);
  }
};

export default countClaims;
