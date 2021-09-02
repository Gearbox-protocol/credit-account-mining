import { ethers } from 'ethers';

interface IAccount {
  index: ethers.BigNumberish;
  merklePath: ethers.utils.BytesLike[];
}

type AccountsList = Record<string, IAccount>;

const usersList: AccountsList = {
  '0xf13df765f3047850cede5aa9fdf20a12a75f7f70': {
    index: BigInt(9007199254740991),
    merklePath: ['0x12', '0x23', '0x34'],
  },
};

export type { IAccount, AccountsList };
export { usersList };
