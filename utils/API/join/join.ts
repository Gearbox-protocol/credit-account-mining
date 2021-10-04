import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { getTypedError } from 'utils/API/errors/error-hub';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
import distributorInfo from 'utils/accounts/distributor-info';
import { MerkleDistributorInfo } from 'utils/merkle/parse-accounts';

type User = MerkleDistributorInfo['claims']['string'];

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
}

const checkPermissions = (address: string): User => {
  if (!(address in distributorInfo.claims)) {
    throw new TerminalError({ code: 'PERMISSION_DENIED' });
  }
  return distributorInfo.claims[address];
};

const isClaimed = async (claimObj: Partial<IClaimObject>, user: User) => {
  try {
    const { contract } = distributorInfo;
    const {
      provider = new ethers.providers.Web3Provider(window.ethereum!),
      signer = provider.getSigner(),
      miningAccount = <AccountMining>AccountMining__factory.connect(contract, signer),
    } = claimObj;

    const claimed = await miningAccount.isClaimed(user.index);
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

export type { IClaimObject, User };
export { checkPermissions, isClaimed, claim, waitTransactionEnd };
