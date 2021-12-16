import {
  RootControllerActions,
  OptionalActions,
} from 'redux/terminalController/terminalControllerActionTypes';
import { Prefix } from '../../messages/messages';
import notFoundStrings from './notfound-strings';

type TerminalErrorCodes =
  | 'COMMAND_NOT_FOUND'
  | 'NO_METAMASK'
  | 'METAMASK_NOT_CONNECTED'
  | 'METAMASK_WRONG_NETWORK'
  | 'METAMASK_RELOGIN'
  | 'GET_ADDRESS_FAILED'
  | 'PERMISSION_DENIED'
  | 'ALREADY_CLAIMED'
  | 'DENIED_BY_USER'
  | 'ACCOUNT_CHANGED'
  | 'CHAIN_CHANGED'
  | 'DISCONNECTED'
  | 'UNEXPECTED_ERROR'
  | 'ACTION_ABORTED'
  | 'NO_MORE_CLAIMS'
  | 'REJECTED'
  | 'ENDPOINT_IS_BUSY';

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

  It’s now time to check the ${Prefix.PREFIX}${RootControllerActions.LINKS} command and join Gearbox socials!
  `,
  DENIED_BY_USER: `
  Seems like you are NGMI, anon! You skipped financial freedom.

  Type ${Prefix.PREFIX}${OptionalActions.MINE} if you exited by mistake.
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
  NO_MORE_CLAIMS: `
  No more claims allowed
  `,
  REJECTED: `
  Request rejected
  `,
  ENDPOINT_IS_BUSY: `
  Endpoint is busy
  `,
};

export type { TerminalErrorCodes };
export default errorStrings;
