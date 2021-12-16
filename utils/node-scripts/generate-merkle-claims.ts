import fs from 'fs';
import path from 'path';
import {
  MerkleDistributorInfo,
  ClaimsInfo,
  keyFromAddress,
  getFilename,
} from 'utils/API/join/join';

type MerkleRaw = Omit<MerkleDistributorInfo, 'contract'> & { claims: ClaimsInfo };
type MerkleSorted = Record<string, ClaimsInfo>;

const formatAddress = (address: string) => address.toLowerCase();

const split = (merkleRaw: MerkleRaw) => {
  const merkleSplit: MerkleSorted = {};

  Object.entries(merkleRaw.claims).forEach(([address, user]) => {
    const formattedAddress = formatAddress(address);
    const key = keyFromAddress(formattedAddress);

    if (!merkleSplit[key]) merkleSplit[key] = {};
    merkleSplit[key][formattedAddress] = user;
  });

  return merkleSplit;
};

type ClaimsPair = [keyof MerkleSorted, MerkleSorted[string]];

const writeTo = (merkleRoute: string) => ([key, claims]: ClaimsPair) => {
  const claimsJson = JSON.stringify(claims);

  fs.writeFile(path.join(merkleRoute, getFilename(key)), claimsJson, 'utf8', (err) => {
    if (err) throw err;
  });
};

const readFrom = (merkleRoute: string) => {
  const jsonString = fs.readFileSync(merkleRoute, 'utf8');
  const merkleRaw: MerkleRaw = JSON.parse(jsonString);
  return merkleRaw;
};

const ensureFolderExistence = (folder: string) => {
  fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

function main() {
  const merkleRoute = process.env.CLAIMS_WRITE_ROUTE;
  if (!merkleRoute) throw new Error('Merkle split destination env not specified');

  const merkleSource = process.env.CLAIMS_MERKLE_SOURCE;
  if (!merkleSource) throw new Error('merkle.json source env not specified');

  ensureFolderExistence(merkleRoute);
  const merkleRaw = readFrom(merkleSource);
  const merkleSplit = split(merkleRaw);
  const writeClaims = writeTo(merkleRoute);

  Object.entries(merkleSplit).forEach(writeClaims);
}

// start script
if (process.env.CLAIMS_GENERATE === 'true') main();

export default main;
