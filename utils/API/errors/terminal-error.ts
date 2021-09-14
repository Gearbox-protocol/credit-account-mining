import { errorStrings } from 'utils/text/terminalText';

enum TerminalErrorCodes {
  COMMAND_NOT_FOUND = 'COMMAND_NOT_FOUND',
  NO_METAMASK = 'NO_METAMASK',
  METAMASK_NOT_CONNECTED = 'METAMASK_NOT_CONNECTED',
  METAMASK_WRONG_NETWORK = 'METAMASK_WRONG_NETWORK',
  NO_GEARBOX_NETWORK = 'NO_GEARBOX_NETWORK',
  METAMASK_RELOGIN = 'METAMASK_RELOGIN',
  GET_ADDRESS_FAILED = 'GET_ADDRESS_FAILED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  ALREADY_CLAIMED = 'ALREADY_CLAIMED',
  DENIED_BY_USER = 'DENIED_BY_USER',
  ACCOUNT_CHANGED = 'ACCOUNT_CHANGED',
  CHAIN_CHANGED = 'CHAIN_CHANGED',
  DISCONNECTED = 'DISCONNECTED',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  ACTION_ABORTED = 'ACTION_ABORTED',
}

interface ITerminalErrorProps {
  code: TerminalErrorCodes;
  message?: string;
  name?: string;
}

class TerminalError extends Error {
  code: TerminalErrorCodes;

  message: string;

  name: string;

  constructor({
    code,
    message = errorStrings[code],
    name = 'Terminal error',
  }: ITerminalErrorProps) {
    super();
    this.code = code;
    this.message = message;
    this.name = name;
  }
}

export { TerminalError, TerminalErrorCodes };
