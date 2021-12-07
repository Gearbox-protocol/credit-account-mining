import { isDev } from 'config/config';
import errorStrings, { TerminalErrorCodes } from './error-strings';

type ErrorNames = 'Metamask error' | 'Terminal error';

interface ITerminalErrorProps {
  code: TerminalErrorCodes;
  message?: string;
  name?: ErrorNames;
  details?: string;
}

class TerminalError extends Error {
  code: TerminalErrorCodes;

  message: string;

  name: string;

  details?: string;

  constructor({
    code,
    message = errorStrings[code],
    name = 'Terminal error',
    details,
  }: ITerminalErrorProps) {
    super();
    this.code = code;
    this.message = message;
    this.name = name;
    this.details = details;

    const isUnexpected = code === 'UNEXPECTED_ERROR';
    if (isDev && details && isUnexpected) console.error(details);
  }
}

export type { TerminalErrorCodes, ErrorNames };
export { TerminalError };
