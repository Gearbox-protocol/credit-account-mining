import { ActionType } from '../terminalControllerActionTypes';

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

export type ControllerUserActions =
  | IActionHelp
  | IActionJoin
  | IActionJoinAccepted
  | IActionJoinDenied
  | IActionMined
  | IActionLinks
  | IActionJoinContinue
  | IActionIsGary;
export type {
  IActionHelp,
  IActionJoin,
  IActionJoinAccepted,
  IActionJoinDenied,
  IActionMined,
  IActionLinks,
  IActionJoinContinue,
  IActionIsGary,
};
export {
  controllerHelp,
  controllerJoin,
  controllerJoinAccepted,
  controllerJoinDenied,
  controllerMined,
  controllerLinks,
  controllerJoinContinue,
  controllerIsGary,
};
