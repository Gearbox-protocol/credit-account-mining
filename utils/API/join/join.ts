import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import path from 'path';
import { claimsRoute, distributorInfo } from 'config/config';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';

interface MerkleDistributorInfo {
  merkleRoot: string;
  contract: string;
}

interface User {
  index: number;
  salt: string;
  proof: string[];
}

type ClaimsInfo = Record<string, User>;

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
}

const keyFromAddress = (address: string) => address.slice(2, 4);
const filename = (key: string) => `${key}.json`;

const getClaims = async (address: string): Promise<ClaimsInfo> => {
  const key = keyFromAddress(address);
  const file = filename(key);
  const filePath = path.join(claimsRoute, file);

  const resp = await fetch(filePath);
  if (!resp.ok) {
    throw new TerminalError({
      code: 'UNEXPECTED_ERROR',
      details: `Response with status: ${resp.status}`,
    });
  }
  const claims: ClaimsInfo = await resp.json();
  return claims;
};

const checkPermissions = async (address: string): Promise<User> => {
  const claims = await getClaims(address);
  if (!(address in claims)) {
    throw new TerminalError({ code: 'PERMISSION_DENIED' });
  }
  return claims[address];
};

const isClaimed = async (claimObj: Partial<IClaimObject>, { index }: User) => {
  const { contract } = distributorInfo;
  const {
    provider = new ethers.providers.Web3Provider(window.ethereum!),
    signer = provider.getSigner(),
    miningAccount = <AccountMining>AccountMining__factory.connect(contract, signer),
  } = claimObj;

  const claimed = await miningAccount.isClaimed(index);
  if (claimed) {
    throw new TerminalError({ code: 'ALREADY_CLAIMED' });
  }

  const claimObject: IClaimObject = {
    miningAccount,
    provider,
    signer,
  };
  return claimObject;
};

const claim = async ({ miningAccount }: IClaimObject, { index, salt, proof }: User) => {
  const res = await miningAccount.claim(index, salt, proof);
  return [res, res.hash];
};

const waitTransactionEnd = async (transaction: ethers.ContractTransaction) => {
  await transaction.wait();
};

export type { IClaimObject, User, MerkleDistributorInfo, ClaimsInfo };
export { checkPermissions, isClaimed, claim, waitTransactionEnd, keyFromAddress, filename };
