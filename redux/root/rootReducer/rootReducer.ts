import { combineReducers } from 'redux';

import { DefaultRootState } from 'react-redux';

import terminalAppReducer, {
  terminalAppDefaultState,
  ITerminalAppState,
} from 'redux/terminalApp/terminalAppReducer';
import terminalReducer, {
  terminalDefaultState,
  ITerminalState,
} from 'redux/terminal/terminalAppReducer';

import { RootReducerAction } from './rootReducerActions';
import ActionType from './rootReducerActionTypes';

interface IState extends DefaultRootState {
  terminalApp: ITerminalAppState;
  terminal: ITerminalState;
}

const combinedReducer = combineReducers({
  terminalApp: terminalAppReducer,
  terminal: terminalReducer,
});

const rootReducer = (
  state: IState = { terminalApp: terminalAppDefaultState, terminal: terminalDefaultState },
  action: RootReducerAction<IState>,
) => {
  switch (action.type) {
    case ActionType.ROOT_HYDRATION: {
      const { terminalApp } = state;
      const isAlreadyHydrated = terminalApp && terminalApp.pageHydrated;
      if (isAlreadyHydrated) {
        return state;
      }
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return combinedReducer(state, action);
  }
};

export type { IState };
export default rootReducer;
