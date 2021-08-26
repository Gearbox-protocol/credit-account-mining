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

export type TerminalControllerActions =
  | ITerminalControllerNext
  | ITerminalControllerGotoRoot
  | ITerminalControllerCommand;
export type { ITerminalControllerNext, ITerminalControllerGotoRoot, ITerminalControllerCommand };
export { terminalControllerGotoRoot, terminalControllerNext, terminalControllerCommand };
