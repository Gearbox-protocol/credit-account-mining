import { AccountMining__factory } from '@diesellabs/gearbox-sdk/lib/types';
import { AccountMining } from '@diesellabs/gearbox-sdk/src/types/AccountMining';
import { ethers } from 'ethers';
import { ErrorHub } from 'utils/API/errors/error-hub';
import { TerminalError, TerminalErrorCodes } from 'utils/API/errors/terminal-error';
import distributorInfo from 'utils/accounts/distributor-info';
import { MerkleDistributorInfo } from 'utils/merkle/parse-accounts';

type User = MerkleDistributorInfo['claims']['string'];

interface IClaimObject {
  miningAccount: AccountMining;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  user: User;
}

const checkPermissions = (address: string): [User, number] => {
  if (!(address in distributorInfo.claims)) {
    throw new TerminalError({ code: TerminalErrorCodes.PERMISSION_DENIED });
  }

  return [distributorInfo.claims[address], 1];
};

const isClaimed = async (user: User) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum!);
    const signer = provider.getSigner();
    const miningAccount: AccountMining = AccountMining__factory.connect(
      distributorInfo.contract,
      signer,
    );

    const claimed = await miningAccount.isClaimed(user.index);
    if (claimed) {
      throw new TerminalError({ code: TerminalErrorCodes.ALREADY_CLAIMED });
    }

    const claimObject: IClaimObject = {
      miningAccount,
      provider,
      signer,
      user,
    };
    return claimObject;
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

const claim = async ({ miningAccount, user: { index, salt, proof } }: IClaimObject) => {
  try {
    const res = await miningAccount.claim(index, salt, proof);
    await res.wait();
    return [res, res.hash];
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

const waitTransactionEnd = async (transaction: ethers.ContractTransaction) => {
  try {
    await transaction.wait();
  } catch (e: any) {
    throw ErrorHub.getTypedError(e);
  }
};

export type { IClaimObject, User };
export {
  checkPermissions, isClaimed, claim, waitTransactionEnd,
};
