import { combineReducers } from 'redux';
import terminalAppReducer, { terminalAppDefaultState } from 'redux/terminalApp/terminalAppReducer';

import { RootReducerAction, IState } from './rootReducerActions';
import ActionType from './rootReducerActionTypes';

const combinedReducer = combineReducers({
  terminalApp: terminalAppReducer,
});

const rootReducer = (
  state = { terminalApp: terminalAppDefaultState },
  action: RootReducerAction,
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
