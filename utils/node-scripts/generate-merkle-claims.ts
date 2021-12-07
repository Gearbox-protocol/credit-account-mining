import fs from 'fs';
import path from 'path';
import {
  MerkleDistributorInfo, ClaimsInfo, keyFromAddress, filename,
} from 'utils/API/join/join';
import jsonRaw from './merkle.json';

type MerkleRaw = Omit<MerkleDistributorInfo, 'contract'> & { claims: ClaimsInfo };
type MerkleSorted = Record<string, ClaimsInfo>;

const split = (merkleRaw: MerkleRaw) => {
  const merleSplit: MerkleSorted = {};
  Object.entries(merkleRaw.claims).forEach(([address, user]) => {
    const key = keyFromAddress(address);
    if (!merleSplit[key]) merleSplit[key] = {};
    merleSplit[key][address] = user;
  });

  return merleSplit;
};

type ClaimsPair = [keyof MerkleSorted, MerkleSorted[string]];

const writeTo = (merkleRoute: string) => ([key, claims]: ClaimsPair) => {
  const claimsJson = JSON.stringify(claims);

  fs.writeFile(path.join(merkleRoute, filename(key)), claimsJson, 'utf8', (err) => {
    if (err) throw err;
  });
};

function main() {
  const merkleRoute = process.env.CLAIMS_WRITE_ROUTE;
  if (!merkleRoute) throw new Error('Merkle env not specified');

  const merkleRaw = jsonRaw as MerkleRaw;
  const merleSplit = split(merkleRaw);
  const writeClaims = writeTo(merkleRoute);

  Object.entries(merleSplit).forEach(writeClaims);
}

export default main;
