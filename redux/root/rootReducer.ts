import { combineReducers } from 'redux';

import { DefaultRootState } from 'react-redux';

import terminalAppReducer, {
  terminalAppDefaultState,
  ITerminalAppState,
} from 'redux/terminalApp/terminalAppReducer';
import terminalReducer, {
  terminalDefaultState,
  ITerminalState,
} from 'redux/terminal/terminalReducer';
import terminalControllerReducer, {
  controllerDefaultState,
  IControllerState,
} from 'redux/terminalController/terminalControllerReducer';
import subscriptionReducer, {
  subscriptionDefaultState,
  ISubscriptionState,
} from 'redux/subscription/subscriptionReducer';
import userReducer, { userDefaultState, IUserState } from 'redux/user/userReducer';

import { RootReducerAction } from './rootReducerActions';
import ActionType from './rootReducerActionTypes';

interface IState extends DefaultRootState {
  terminalApp: ITerminalAppState;
  terminal: ITerminalState;
  terminalController: IControllerState;
  user: IUserState;
  subscription: ISubscriptionState;
}

const combinedReducer = combineReducers({
  terminalApp: terminalAppReducer,
  terminal: terminalReducer,
  terminalController: terminalControllerReducer,
  user: userReducer,
  subscription: subscriptionReducer,
});

const rootReducer = (
  state: IState = {
    terminalApp: terminalAppDefaultState,
    terminal: terminalDefaultState,
    terminalController: controllerDefaultState,
    user: userDefaultState,
    subscription: subscriptionDefaultState,
  },
  action: RootReducerAction<IState>,
) => {
  switch (action.type) {
    case ActionType.ROOT_HYDRATION: {
      const { terminalApp } = state;
      const isAlreadyHydrated = terminalApp && terminalApp.appHydrated;
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
