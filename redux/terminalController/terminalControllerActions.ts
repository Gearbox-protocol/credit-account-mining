import ActionType from './terminalControllerActionTypes';

interface IControllerNext {
  type: ActionType.NEXT;
}

interface IControllerGotoRoot {
  type: ActionType.GOTO_ROOT;
}

interface IControllerCommand {
  type: ActionType.COMMAND;
  payload: string;
}

interface IControllerHelp {
  type: ActionType.HELP;
}

interface IControllerClear {
  type: ActionType.C_CLEAR;
}

interface IControllerJoin {
  type: ActionType.JOIN;
}

const controllerNext = (): IControllerNext => ({
  type: ActionType.NEXT,
});

const controllerGotoRoot = (): IControllerGotoRoot => ({
  type: ActionType.GOTO_ROOT,
});

const controllerCommand = (c: string): IControllerCommand => ({
  type: ActionType.COMMAND,
  payload: c,
});

const controllerHelp = (): IControllerHelp => ({
  type: ActionType.HELP,
});

const controllerClear = (): IControllerClear => ({
  type: ActionType.C_CLEAR,
});

const controllerJoin = (): IControllerJoin => ({
  type: ActionType.JOIN,
});

export type ControllerActions =
  | IControllerNext
  | IControllerGotoRoot
  | IControllerCommand
  | IControllerHelp
  | IControllerClear
  | IControllerJoin;
export type {
  IControllerNext,
  IControllerGotoRoot,
  IControllerCommand,
  IControllerHelp,
  IControllerClear,
  IControllerJoin,
};
export {
  controllerGotoRoot,
  controllerNext,
  controllerCommand,
  controllerHelp,
  controllerClear,
  controllerJoin,
};
