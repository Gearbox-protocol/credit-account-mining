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

interface ErrorMessage {
  msg: string | undefined;
  center: boolean;
}

interface IControllerError {
  type: ActionType.CONTROLLER_ERROR;
  payload: ErrorMessage;
}

interface IActionHelp {
  type: ActionType.HELP;
}

interface IActionJoin {
  type: ActionType.JOIN;
}

interface IActionIsGary {
  type: ActionType.IS_GARY;
}

interface IActionJoinContinue {
  type: ActionType.JOIN_CONTINUE;
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

const controllerAddAction = (a: OptionalActions): IAddAction => ({
  type: ActionType.ADD_ACTION,
  payload: a,
});

const controllerCommand = (c: string): IActionCommand => ({
  type: ActionType.COMMAND,
  payload: c,
});

const controllerError = (e: ErrorMessage): IControllerError => ({
  type: ActionType.CONTROLLER_ERROR,
  payload: e,
});

const controllerHelp = (): IActionHelp => ({
  type: ActionType.HELP,
});

const controllerJoin = (): IActionJoin => ({
  type: ActionType.JOIN,
});

const controllerIsGary = (): IActionIsGary => ({
  type: ActionType.IS_GARY,
});

const controllerJoinContinue = (): IActionJoinContinue => ({
  type: ActionType.JOIN_CONTINUE,
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
  | IAddAction
  | IActionJoinContinue
  | IActionIsGary
  | IControllerError;
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
  IActionJoinContinue,
  IActionIsGary,
  IControllerError,
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
  controllerJoinContinue,
  controllerIsGary,
  controllerError,
};
