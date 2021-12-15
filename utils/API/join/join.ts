import { BigNumber, ethers } from 'ethers';
import path from 'path';
import { claimsRoute, claimMaxCount } from 'config/config';
import { IClaimObject } from 'utils/API/web3/make-claim';
import countClaims from 'utils/API/mined/mined';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';

interface MerkleDistributorInfo {
  merkleRoot: string;
  contract: string;
}

interface User {
  index: number;
  proof: string[];
}

type ClaimsInfo = Record<string, User>;

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

const isClaimed = async (claimObj: IClaimObject, { index }: User) => {
  const claimed = await claimObj.miningAccount.isClaimed(index);
  if (claimed) {
    throw new TerminalError({ code: 'ALREADY_CLAIMED' });
  }
};

const claim = async (claimObj: IClaimObject, { index, proof }: User) => {
  try {
    const salt = BigNumber.from(
      ethers.utils.keccak256(
        BigNumber.from(await claimObj.miningAccount.signer.getAddress())
          .mul(121)
          .add(123)
          .toHexString(),
      ),
    );

    const res = await claimObj.miningAccount.claim(index, salt, proof);
    return [res, res.hash];
  } catch (e) {
    const totalClaimed = await countClaims(claimObj);
    if (totalClaimed >= claimMaxCount) throw new TerminalError({ code: 'NO_MORE_CLAIMS' });
    throw e;
  }
};

const waitTransactionEnd = async (transaction: ethers.ContractTransaction) => {
  await transaction.wait();
};

export type {
  IClaimObject, User, MerkleDistributorInfo, ClaimsInfo,
};
export {
  checkPermissions, isClaimed, claim, waitTransactionEnd, keyFromAddress, filename,
};
