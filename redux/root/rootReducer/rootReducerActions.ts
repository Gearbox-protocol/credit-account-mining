import { DefaultRootState } from 'react-redux';

import { ITerminalAppState } from 'redux/terminalApp/terminalAppReducer';
import { TerminalAppActions } from 'redux/terminalApp/terminalAppAction';

import ActionType from './rootReducerActionTypes';

interface IState extends DefaultRootState {
  terminalApp: ITerminalAppState;
}

interface IRootHydration {
  type: ActionType.ROOT_HYDRATION;
  payload: IState;
}

export type RootReducerAction = IRootHydration | TerminalAppActions;

export type { IState };
