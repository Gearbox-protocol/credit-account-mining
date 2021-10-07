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
import subscriptionControllerReducer, {
  subscriptionDefaultState,
  ISubscriptionState,
} from 'redux/subscriptionController/subscriptionControllerReducer';
import userReducer, { userDefaultState, IUserState } from 'redux/user/userReducer';

import { RootReducerAction } from './rootReducerActions';
import ActionType from './rootReducerActionTypes';

interface IState extends DefaultRootState {
  terminalApp: ITerminalAppState;
  terminal: ITerminalState;
  terminalController: IControllerState;
  user: IUserState;
  subscriptionController: ISubscriptionState;
}

const combinedReducer = combineReducers({
  terminalApp: terminalAppReducer,
  terminal: terminalReducer,
  terminalController: terminalControllerReducer,
  user: userReducer,
  subscriptionController: subscriptionControllerReducer,
});

const rootReducer = (
  state: IState = {
    terminalApp: terminalAppDefaultState,
    terminal: terminalDefaultState,
    terminalController: controllerDefaultState,
    user: userDefaultState,
    subscriptionController: subscriptionDefaultState,
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
