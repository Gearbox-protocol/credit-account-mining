import ActionType from './terminalControllerActionTypes';

interface IControllerNext {
  type: ActionType.NEXT;
}

interface IControllerGotoRoot {
  type: ActionType.GOTO_ROOT;
}

interface IControllerGotoJoin {
  type: ActionType.GOTO_JOIN;
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

interface IControllerJoinAccepted {
  type: ActionType.JOIN_ACCEPTED;
}

interface IControllerJoinDenied {
  type: ActionType.JOIN_DENIED;
}

interface IControllerMined {
  type: ActionType.COUNT_CLAIMS;
}

const controllerNext = (): IControllerNext => ({
  type: ActionType.NEXT,
});

const controllerGotoRoot = (): IControllerGotoRoot => ({
  type: ActionType.GOTO_ROOT,
});

const controllerGotoJoin = (): IControllerGotoJoin => ({
  type: ActionType.GOTO_JOIN,
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

const controllerJoinAccepted = (): IControllerJoinAccepted => ({
  type: ActionType.JOIN_ACCEPTED,
});

const controllerJoinDenied = (): IControllerJoinDenied => ({
  type: ActionType.JOIN_DENIED,
});

const controllerMined = (): IControllerMined => ({
  type: ActionType.COUNT_CLAIMS,
});

export type ControllerActions =
  | IControllerNext
  | IControllerGotoRoot
  | IControllerCommand
  | IControllerHelp
  | IControllerClear
  | IControllerJoin
  | IControllerGotoJoin
  | IControllerJoinAccepted
  | IControllerJoinDenied
  | IControllerMined;
export type {
  IControllerNext,
  IControllerGotoRoot,
  IControllerCommand,
  IControllerHelp,
  IControllerClear,
  IControllerJoin,
  IControllerGotoJoin,
  IControllerJoinAccepted,
  IControllerJoinDenied,
  IControllerMined,
};
export {
  controllerGotoRoot,
  controllerNext,
  controllerCommand,
  controllerHelp,
  controllerClear,
  controllerJoin,
  controllerGotoJoin,
  controllerJoinAccepted,
  controllerJoinDenied,
  controllerMined,
};
