import { TerminalAppActions } from 'redux/terminalApp/terminalAppAction';
import { TerminalActions } from 'redux/terminal/terminalAction';
import { TerminalControllerActions } from 'redux/terminalController/terminalControllerActions';

import ActionType from './rootReducerActionTypes';

interface IRootHydration<T> {
  type: ActionType.ROOT_HYDRATION;
  payload: T;
}

export type RootReducerAction<T> =
  | IRootHydration<T>
  | TerminalAppActions
  | TerminalActions
  | TerminalControllerActions;
