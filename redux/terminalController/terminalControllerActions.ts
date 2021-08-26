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
}

interface ITerminalControllerClear {
  type: ActionType.C_CLEAR;
}

interface ITerminalControllerJoin {
  type: ActionType.JOIN;
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

const terminalControllerHelp = (): ITerminalControllerHelp => ({
  type: ActionType.HELP,
});

const terminalControllerClear = (): ITerminalControllerClear => ({
  type: ActionType.C_CLEAR,
});

const terminalControllerJoin = (): ITerminalControllerJoin => ({
  type: ActionType.JOIN,
});

export type TerminalControllerActions =
  | ITerminalControllerNext
  | ITerminalControllerGotoRoot
  | ITerminalControllerCommand
  | ITerminalControllerHelp
  | ITerminalControllerClear
  | ITerminalControllerJoin;
export type {
  ITerminalControllerNext,
  ITerminalControllerGotoRoot,
  ITerminalControllerCommand,
  ITerminalControllerHelp,
  ITerminalControllerClear,
  ITerminalControllerJoin,
};
export {
  terminalControllerGotoRoot,
  terminalControllerNext,
  terminalControllerCommand,
  terminalControllerHelp,
  terminalControllerClear,
  terminalControllerJoin,
};
