import { BigNumber, ethers } from 'ethers';
import path from 'path';
import axios from 'axios';
import { claimsRoute, claimMaxCount } from 'config/config';
import { IClaimObject } from 'utils/API/web3/make-claim';
import countClaims from 'utils/API/mined/mined';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';

interface MerkleDistributorInfo {
  contract: string;
}

interface User {
  index: number;
  proof: string[];
}

type ClaimsInfo = Record<string, User>;

const keyFromAddress = (address: string) => address.slice(2, 4);
const getFilename = (key: string) => `${key}.json`;

const getClaims = async (address: string): Promise<ClaimsInfo> => {
  const key = keyFromAddress(address);
  const file = getFilename(key);
  const filePath = path.join(claimsRoute, file);

  const result = await axios.get<ClaimsInfo>(filePath);
  return result.data;
};

const checkPermissions = async (address: string): Promise<User> => {
  const claims = await getClaims(address);
  if (!(address in claims)) {
    throw new TerminalError({ code: 'PERMISSION_DENIED' });
  }
  return claims[address];
};

const isClaimed = async ({ miningAccount }: IClaimObject, { index }: User) => {
  const claimed = await miningAccount.isClaimed(index);
  if (claimed) {
    throw new TerminalError({ code: 'ALREADY_CLAIMED' });
  }
};

const claim = async (claimObj: IClaimObject, { index, proof }: User) => {
  const { miningAccount } = claimObj;
  try {
    const salt = BigNumber.from(
      ethers.utils.keccak256(
        BigNumber.from(await miningAccount.signer.getAddress())
          .mul(121)
          .add(123)
          .toHexString(),
      ),
    );

    const res = await miningAccount.claim(index, salt, proof);
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
  checkPermissions, isClaimed, claim, waitTransactionEnd, keyFromAddress, getFilename,
};
