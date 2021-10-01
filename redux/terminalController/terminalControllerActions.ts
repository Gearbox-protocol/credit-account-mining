import ActionType from './terminalControllerActionTypes';

interface IActionNext {
  type: ActionType.NEXT;
}

interface IActionGotoRoot {
  type: ActionType.GOTO_ROOT;
}

interface IActionGotoJoin {
  type: ActionType.GOTO_JOIN;
}

interface IActionCommand {
  type: ActionType.COMMAND;
  payload: string;
}

interface IActionHelp {
  type: ActionType.HELP;
}

interface IActionJoin {
  type: ActionType.JOIN;
}

interface IActionJoinAccepted {
  type: ActionType.JOIN_ACCEPTED;
}

interface IActionJoinDenied {
  type: ActionType.JOIN_DENIED;
}

interface IActionMined {
  type: ActionType.MINED;
}

interface IActionLinks {
  type: ActionType.LINKS;
}

const controllerNext = (): IActionNext => ({
  type: ActionType.NEXT,
});

const controllerGotoRoot = (): IActionGotoRoot => ({
  type: ActionType.GOTO_ROOT,
});

const controllerGotoJoin = (): IActionGotoJoin => ({
  type: ActionType.GOTO_JOIN,
});

const controllerCommand = (c: string): IActionCommand => ({
  type: ActionType.COMMAND,
  payload: c,
});

const controllerHelp = (): IActionHelp => ({
  type: ActionType.HELP,
});

const controllerJoin = (): IActionJoin => ({
  type: ActionType.JOIN,
});

const controllerJoinAccepted = (): IActionJoinAccepted => ({
  type: ActionType.JOIN_ACCEPTED,
});

const controllerJoinDenied = (): IActionJoinDenied => ({
  type: ActionType.JOIN_DENIED,
});

const controllerMined = (): IActionMined => ({
  type: ActionType.MINED,
});

const controllerLinks = (): IActionLinks => ({
  type: ActionType.LINKS,
});

export type ControllerActions =
  | IActionNext
  | IActionGotoRoot
  | IActionCommand
  | IActionHelp
  | IActionJoin
  | IActionGotoJoin
  | IActionJoinAccepted
  | IActionJoinDenied
  | IActionMined
  | IActionLinks;
export type {
  IActionNext,
  IActionGotoRoot,
  IActionCommand,
  IActionHelp,
  IActionJoin,
  IActionGotoJoin,
  IActionJoinAccepted,
  IActionJoinDenied,
  IActionMined,
  IActionLinks,
};
export {
  controllerGotoRoot,
  controllerNext,
  controllerCommand,
  controllerHelp,
  controllerJoin,
  controllerGotoJoin,
  controllerJoinAccepted,
  controllerJoinDenied,
  controllerMined,
  controllerLinks,
};
