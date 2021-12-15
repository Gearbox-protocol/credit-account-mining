import { TerminalAppActions } from 'redux/terminalApp/terminalAppAction';
import { TerminalActions } from 'redux/terminal/terminalAction';
import { ControllerActions } from 'redux/terminalController/actions/terminalControllerActions';
import { ControllerUserActions } from 'redux/terminalController/actions/terminalControllerUserActions';

import ActionType from './rootReducerActionTypes';

interface IRootHydration<T> {
  type: ActionType.ROOT_HYDRATION;
  payload: T;
}

export type RootReducerAction<T> =
  | IRootHydration<T>
  | TerminalAppActions
  | TerminalActions
  | ControllerActions
  | ControllerUserActions;
