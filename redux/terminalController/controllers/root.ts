import { Action } from 'redux';
import {
  controllerHelp,
  controllerJoin,
  controllerJoinAccepted,
  controllerMined,
  controllerLinks,
} from 'redux/terminalController/actions/terminalControllerUserActions';
import {
  RootControllerActions,
  OptionalActions,
} from 'redux/terminalController/terminalControllerActionTypes';
import join from './join/join';

type UserActions = Record<string, () => Action<any>>;

type Controller = {
  userActions?: UserActions;
  children: Record<string, Controller> | null;
};

const optionalActions: UserActions = {
  [OptionalActions.MINE]: controllerJoinAccepted,
};

const root: Controller = {
  userActions: {
    [RootControllerActions.HELP]: controllerHelp,
    [RootControllerActions.JOIN]: controllerJoin,
    [RootControllerActions.MINED]: controllerMined,
    [RootControllerActions.LINKS]: controllerLinks,
  },
  children: {
    join,
  },
};

export type { Controller };
export { optionalActions };
export default root;
