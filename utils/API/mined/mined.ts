import makeClaim, { IClaimObject } from 'utils/API/web3/make-claim';

const countClaims = async (claimObj: Partial<IClaimObject>) => {
  const safeClaimObj = await makeClaim(claimObj);

  const query = await safeClaimObj.miningAccount.queryFilter(
    safeClaimObj.miningAccount.filters.Claimed(),
  );

  return [safeClaimObj, query.length];
};

export default countClaims;
