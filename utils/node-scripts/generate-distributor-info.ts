import fs from 'fs';
import { parseAccounts } from 'utils/merkle/parse-accounts';
import accountsRaw from 'utils/accounts/accounts';

const accountListRoute = process.env.ACCOUNT_LIST_ROUTE;
if (!accountListRoute) throw new Error('Routes env not specified');

const distributorInfo = parseAccounts(accountsRaw);

const distributorInfoJson = JSON.stringify(distributorInfo);

const codeStr = `
import { MerkleDistributorInfo } from 'utils/merkle/parse-accounts';
  
const distributorInfo: MerkleDistributorInfo = ${distributorInfoJson}; 

export default distributorInfo;
`;

fs.writeFileSync(accountListRoute, codeStr, 'utf8');
