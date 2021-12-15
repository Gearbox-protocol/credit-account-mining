import { IClaimObject } from 'utils/API/web3/make-claim';

const countClaims = async (claimObj: IClaimObject) => {
  const query = await claimObj.miningAccount.queryFilter(claimObj.miningAccount.filters.Claimed());
  return query.length;
};

export default countClaims;
