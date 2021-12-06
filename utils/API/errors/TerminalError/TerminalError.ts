import errorStrings, { TerminalErrorCodes } from './error-strings';

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
