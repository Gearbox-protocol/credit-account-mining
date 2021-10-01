import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';
import notFoundStrings from './notfound-strings';

const errorStrings: Record<TerminalErrorCodes, string> = {
  get COMMAND_NOT_FOUND() {
    return notFoundStrings[Math.floor(Math.random() * notFoundStrings.length)];
  },
  NO_METAMASK: `
  Metamask not found. Please install Metamask.
  `,
  METAMASK_NOT_CONNECTED: `
  Failed to connect to Metamask. Try again.
  `,
  METAMASK_WRONG_NETWORK: `
  Please switch to Mainnet.
  `,
  NO_GEARBOX_NETWORK: `
  Target network not specified
  `,
  METAMASK_RELOGIN: `
  Log in and try again
  `,
  GET_ADDRESS_FAILED: `
  Failed to get your account address
  `,
  PERMISSION_DENIED: `
  Houston, we have a problem! 

  Looks like you haven’t been active in the governance of protocols selected. 

  Please check other activities you can join in order to become part of Gearbox governance: <>link<>
  `,
  ALREADY_CLAIMED: `
  Hold up, you have already mined 1 Credit Account designated for you.

  It’s now time to check the /link command and join Gearbox socials!
  `,
  DENIED_BY_USER: `
  Seems like you are NGMI, anon! You skipped financial freedom.

  Type /mine if you exited by mistake.
  `,
  ACCOUNT_CHANGED: `
  You have just changed your account. All active actions were aborted.
  `,
  CHAIN_CHANGED: `
  You have just changed active chain. All active actions were aborted.
  `,
  DISCONNECTED: `
  You have just disconnected. Please, connect and try again.
  `,
  UNEXPECTED_ERROR: `
  Unexpected Error
  `,
  ACTION_ABORTED: '',
};

export default errorStrings;
