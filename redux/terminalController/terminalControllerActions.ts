import ActionType from './terminalControllerActionTypes';

interface ITerminalControllerNext {
  type: ActionType.NEXT;
}

interface ITerminalControllerGotoRoot {
  type: ActionType.GOTO_ROOT;
}

interface ITerminalControllerCommand {
  type: ActionType.COMMAND;
  payload: string;
}

interface ITerminalControllerHelp {
  type: ActionType.HELP;
  payload: string;
}

interface ITerminalControllerClear {
  type: ActionType.C_CLEAR;
}

const terminalControllerNext = (): ITerminalControllerNext => ({
  type: ActionType.NEXT,
});

const terminalControllerGotoRoot = (): ITerminalControllerGotoRoot => ({
  type: ActionType.GOTO_ROOT,
});

const terminalControllerCommand = (c: string): ITerminalControllerCommand => ({
  type: ActionType.COMMAND,
  payload: c,
});

const terminalControllerHelp = (s: string): ITerminalControllerHelp => ({
  type: ActionType.HELP,
  payload: s,
});

const terminalControllerClear = (): ITerminalControllerClear => ({
  type: ActionType.C_CLEAR,
});

export type TerminalControllerActions =
  | ITerminalControllerNext
  | ITerminalControllerGotoRoot
  | ITerminalControllerCommand
  | ITerminalControllerHelp
  | ITerminalControllerClear;
export type {
  ITerminalControllerNext,
  ITerminalControllerGotoRoot,
  ITerminalControllerCommand,
  ITerminalControllerHelp,
  ITerminalControllerClear,
};
export {
  terminalControllerGotoRoot,
  terminalControllerNext,
  terminalControllerCommand,
  terminalControllerHelp,
  terminalControllerClear,
};
