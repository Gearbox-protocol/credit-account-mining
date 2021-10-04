import { ActionType, OptionalActions } from './terminalControllerActionTypes';

interface IActionGoto {
  type: ActionType.GOTO;
  payload: string;
}

interface IActionGotoRoot {
  type: ActionType.GOTO_ROOT;
}

interface IAddAction {
  type: ActionType.ADD_ACTION;
  payload: OptionalActions;
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

const controllerGoto = (t: string): IActionGoto => ({
  type: ActionType.GOTO,
  payload: t,
});

const controllerGotoRoot = (): IActionGotoRoot => ({
  type: ActionType.GOTO_ROOT,
});

const controllerAddAction = (c: OptionalActions): IAddAction => ({
  type: ActionType.ADD_ACTION,
  payload: c,
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
  | IActionGoto
  | IActionGotoRoot
  | IActionCommand
  | IActionHelp
  | IActionJoin
  | IActionJoinAccepted
  | IActionJoinDenied
  | IActionMined
  | IActionLinks
  | IAddAction;
export type {
  IActionGoto,
  IActionGotoRoot,
  IActionCommand,
  IActionHelp,
  IActionJoin,
  IActionJoinAccepted,
  IActionJoinDenied,
  IActionMined,
  IActionLinks,
  IAddAction,
};
export {
  controllerGotoRoot,
  controllerGoto,
  controllerCommand,
  controllerHelp,
  controllerJoin,
  controllerJoinAccepted,
  controllerJoinDenied,
  controllerMined,
  controllerLinks,
  controllerAddAction,
};
