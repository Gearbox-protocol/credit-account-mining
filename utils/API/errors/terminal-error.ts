import errorStrings from './errors-strings';

type TerminalErrorCodes =
  | 'COMMAND_NOT_FOUND'
  | 'NO_METAMASK'
  | 'METAMASK_NOT_CONNECTED'
  | 'METAMASK_WRONG_NETWORK'
  | 'NO_GEARBOX_NETWORK'
  | 'METAMASK_RELOGIN'
  | 'GET_ADDRESS_FAILED'
  | 'PERMISSION_DENIED'
  | 'ALREADY_CLAIMED'
  | 'DENIED_BY_USER'
  | 'ACCOUNT_CHANGED'
  | 'CHAIN_CHANGED'
  | 'DISCONNECTED'
  | 'UNEXPECTED_ERROR'
  | 'ACTION_ABORTED';

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

export type { TerminalErrorCodes };
export { TerminalError };
