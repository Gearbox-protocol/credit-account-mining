import fs from 'fs';
import path from 'path';
import {
  MerkleDistributorInfo, ClaimsInfo, keyFromAddress, filename,
} from 'utils/API/join/join';

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

const readFrom = (merkleRoute: string) => {
  const jsonString = fs.readFileSync(merkleRoute, 'utf8');
  const merkleRaw: MerkleRaw = JSON.parse(jsonString);
  return merkleRaw;
};

const ensureFolderExistence = (Folder: string) => {
  fs.mkdir(Folder, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

const clearFolder = (Folder: string) => {
  const files = fs.readdirSync(Folder);
  files.map((file) => fs.unlinkSync(path.join(Folder, file)));
};

function main() {
  const merkleRoute = process.env.CLAIMS_WRITE_ROUTE;
  if (!merkleRoute) throw new Error('Merkle split destination env not specified');

  const merkleSource = process.env.CLAIMS_MERKLE_SOURCE;
  if (!merkleSource) throw new Error('merkle.json source env not specified');

  ensureFolderExistence(merkleRoute);
  clearFolder(merkleRoute);

  const merkleRaw = readFrom(merkleSource);
  const merleSplit = split(merkleRaw);
  const writeClaims = writeTo(merkleRoute);

  Object.entries(merleSplit).forEach(writeClaims);
}

// start script
if (process.env.CLAIMS_GENERATE === 'true') main();

export default main;
