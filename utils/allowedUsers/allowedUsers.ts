interface IAccount {
  index: number;
  merklePath: Array<string>;
}

type AccountsList = Record<string, IAccount>;

const usersList: AccountsList = {
  '0xf13df765f3047850cede5aa9fdf20a12a75f7f70': { index: 1234678910, merklePath: ['1', '2', '3'] },
};

export type { IAccount, AccountsList };
export { usersList };
