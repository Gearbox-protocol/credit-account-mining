import { ethers } from 'ethers';

interface IAccount {
  index: ethers.BigNumberish;
  merklePath: ethers.utils.BytesLike[];
}

type AccountsList = Record<string, IAccount>;

export type { IAccount, AccountsList };
