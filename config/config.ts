import { MerkleDistributorInfo } from 'utils/API/join/join';

const distributorInfo: MerkleDistributorInfo = {
  merkleRoot: '0xa654f6f122e357047995697bdf07d6b795df8c10749387d599b86460e104b878',
  contract: '0x1417DD8865E30FC6619279Ce4eCeC373b7f5eFE6',
};

const network = process.env.NEXT_PUBLIC_GEARBOX_NETWORK || '42';
const claimsRoute = process.env.NEXT_PUBLIC_CLAIMS_ROUTE || '/';
const isDev = process.env.NODE_ENV === 'development';

export {
  network, claimsRoute, distributorInfo, isDev,
};
