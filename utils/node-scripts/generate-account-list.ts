import fs from 'fs';
import { ethers } from 'ethers';
import BalanceTree from 'utils/merkle-tree/balance-tree';
import { AccountsList } from 'utils/accounts/account-types';
import accountsRaw from 'utils/accounts/accounts';
import { salt } from 'utils/helpers/helpers';

interface IBalanceTreeData {
  account: string;
  amount: ethers.BigNumber;
}

const constructAccountList = (accounts: string[]): [AccountsList, string] => {
  const initialData: IBalanceTreeData[] = accounts.map((value, index) => ({
    account: value,
    amount: salt(index, value),
  }));
  const tree = new BalanceTree(initialData);
  const root = tree.getHexRoot();

  const accountsList = accounts.reduce((prevSum, value, index) => {
    const nextSum = { ...prevSum };
    nextSum[value] = {
      index,
      merklePath: tree.getHexProof(index, value, salt(index, value)),
    };
    return nextSum;
  }, <AccountsList>{});

  return [accountsList, root];
};

const accountListRoute = process.env.ACCOUNT_LIST_ROUTE;
if (!accountListRoute) throw new Error('Routes env not specified');

const [accountList, root] = constructAccountList(accountsRaw);

const accountListJson = JSON.stringify(accountList);
const rootJson = JSON.stringify(root);

const codeStr = `
const accounts = ${accountListJson}; 
const root = ${rootJson}; 
export { accounts, root };
`;

fs.writeFileSync(accountListRoute, codeStr, 'utf8');
