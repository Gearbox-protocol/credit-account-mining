import { MerkleDistributorInfo } from 'utils/API/join/join';

const distributorInfo: MerkleDistributorInfo = {
  contract: process.env.NEXT_PUBLIC_CONTRACT || '',
};

const claimMaxCount = Number(process.env.NEXT_PUBLIC_CLAIM_MAX_COUNT) || 0;
const videoSource = 'https://youtu.be/2DZafHnECXs';
const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK || '42';
const claimsRoute = process.env.NEXT_PUBLIC_CLAIMS_ROUTE || '/';
const isDev = process.env.NODE_ENV === 'development';
const isLive = process.env.NEXT_PUBLIC_APP_LIVE === 'true';
const backednAddress = 'mining.gearbox-api.com';

export {
  network,
  claimsRoute,
  distributorInfo,
  isDev,
  videoSource,
  isLive,
  claimMaxCount,
  backednAddress,
};
