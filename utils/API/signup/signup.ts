import { ethers } from 'ethers';
import axios from 'axios';
import { backednAddress } from 'config/config';
import { IClaimObject } from 'utils/API/web3/make-claim';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';

interface AgreementResponse {
  access: string;
}

const accessTarget = '0x116e09bb3a6718aac76f6ae01eb2f89f4d9fd80c1abb49897f4abc2c8c53838d';

function checkLogin(data: AgreementResponse) {
  const { access } = data;
  const currentAccess = ethers.utils.sha256(access);

  if (currentAccess !== accessTarget) {
    throw new TerminalError({
      code: 'PERMISSION_DENIED',
    });
  }
}

const getFullUrl = (url: string) => `${backednAddress}${url}`;

const agreement = 'By accessing or using Gearbox App, I agree to the Terms of Service (https://gearbox.fi/terms) and confirm that I have read and understood the Privacy Notice (https://gearbox.fi/privacy) and Risk Disclosure Statement (https://gearbox.fi/risks).\n'
  + '\n'
  + 'I hereby further represent and warrant that:\n'
  + '- I am not a citizen or resident of, or person subject to jurisdiction of, or located in, Cuba, Democratic People’s Republic of North Korea, Islamic Republic of Iran, Syria, the Crimea or Sevastopol, the People Republic of China (excluding Hong Kong, Macao and Taiwan), the United States of America (including its territories: American Samoa, Guam, Puerto Rico, the Northern Mariana Islands and the U.S. Virgin Islands), and shall not use or access Gearbox App while in any of the above territories.\n'
  + '- I am not subject to any sanctions administered or enforced by any country, government or international authority, and that I am not acting in the interests of such persons.';

const signup = async ({ miningAccount }: IClaimObject, address: string) => {
  console.log('LEN', agreement.length);
  const signature = await miningAccount.signer.signMessage(agreement);

  const result = await axios.post<AgreementResponse>(getFullUrl('/api/signup'), {
    account: address,
    signature,
  });

  checkLogin(result.data);
};

export type { AgreementResponse };
export { signup, checkLogin };
