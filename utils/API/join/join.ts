import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { getTypedError } from 'utils/API/errors/error-hub';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
import distributorInfo from 'utils/accounts/distributor-info';

interface MerkleDistributorInfo {
  merkleRoot: string;
  contract: string;
}

interface User {
  index: number;
  salt: string;
  proof: string[];
}

interface ClaimsInfo {
  [accountAddress: string]: User;
}

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
}

const getClaims = async (address: string): Promise<ClaimsInfo> => {
  console.log(address);
  const claims = {} as ClaimsInfo;
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
  try {
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
  } catch (e: any) {
    throw getTypedError(e);
  }
};

const claim = async ({ miningAccount }: IClaimObject, { index, salt, proof }: User) => {
  try {
    const res = await miningAccount.claim(index, salt, proof);
    return [res, res.hash];
  } catch (e: any) {
    throw getTypedError(e);
  }
};

const waitTransactionEnd = async (transaction: ethers.ContractTransaction) => {
  try {
    await transaction.wait();
  } catch (e: any) {
    throw getTypedError(e);
  }
};

export type { IClaimObject, User, MerkleDistributorInfo, ClaimsInfo };
export { checkPermissions, isClaimed, claim, waitTransactionEnd };
