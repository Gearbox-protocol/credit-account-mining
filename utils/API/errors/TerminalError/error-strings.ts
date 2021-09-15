import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';

const errorStrings: Record<TerminalErrorCodes, string> = {
  COMMAND_NOT_FOUND: `
    Command not found
  `,
  NO_METAMASK: `
   Failed. Please install Metamask
  `,
  METAMASK_NOT_CONNECTED: `
    Failed to connect Metamask
  `,
  METAMASK_WRONG_NETWORK: `
    Please switch to Mainnet and try again.
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
    Permission to join Gearbox Launch Community is denied
  `,
  ALREADY_CLAIMED: `
    you already mined your Credit Account. Thanks for joining to Gearbox Launch Community.
  `,
  DENIED_BY_USER: `
    you skip our movement to Freedom.
  `,
  ACCOUNT_CHANGED: `
  you have just changed your account. All active actions were aborted.
  `,
  CHAIN_CHANGED: `
  you have just changed your chain. All active actions were aborted.
  `,
  DISCONNECTED: `
  you have just disconnected. Please, connect and try again.
  `,
  UNEXPECTED_ERROR: `
  Unexpected Error
  `,
  ACTION_ABORTED: '',
} as const;

export default errorStrings;
