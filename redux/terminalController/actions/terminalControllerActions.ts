import { ActionType, OptionalActions } from '../terminalControllerActionTypes';

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

export type ControllerActions = IActionGoto | IActionGotoRoot | IActionCommand | IAddAction;
export type {
  IActionGoto, IActionGotoRoot, IActionCommand, IAddAction,
};
export {
  controllerGotoRoot, controllerGoto, controllerCommand, controllerAddAction,
};
