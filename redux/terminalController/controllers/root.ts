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
const cmdPrefix = '>';

const optionalActions: UserActions = {
  [OptionalActions.MINE]: controllerJoinAccepted,
  [cmdPrefix + OptionalActions.MINE]: controllerJoinAccepted,
};



const root: Controller = {
  userActions: {
    [RootControllerActions.HELP]: controllerHelp,
    [RootControllerActions.JOIN]: controllerJoin,
    [RootControllerActions.MINED]: controllerMined,
    [RootControllerActions.LINKS]: controllerLinks,
    [cmdPrefix + RootControllerActions.HELP]: controllerHelp,
    [cmdPrefix + RootControllerActions.JOIN]: controllerJoin,
    [cmdPrefix + RootControllerActions.MINED]: controllerMined,
    [cmdPrefix + RootControllerActions.LINKS]: controllerLinks,
  },
  children: {
    join,
  },
};

export type { Controller };
export { optionalActions };
export default root;
