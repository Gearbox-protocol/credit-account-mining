import { MerkleDistributorInfo } from 'utils/API/join/join';

const distributorInfo: MerkleDistributorInfo = {
  merkleRoot: process.env.NEXT_PUBLIC_MERKLE_ROOT || '',
  contract: process.env.NEXT_PUBLIC_CONTRACT || '',
};

const videoSource = process.env.NEXT_PUBLIC_VIDEO_SOURCE || '';
const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK || '42';
const claimsRoute = process.env.NEXT_PUBLIC_CLAIMS_ROUTE || '/';
const claimMaxCount = Number(process.env.NEXT_PUBLIC_CLAIM_MAX_COUNT) || 0;
const isDev = process.env.NODE_ENV === 'development';
const isLive = process.env.NEXT_PUBLIC_APP_LIVE === 'true';

export {
  network, claimsRoute, distributorInfo, isDev, videoSource, isLive, claimMaxCount,
};
