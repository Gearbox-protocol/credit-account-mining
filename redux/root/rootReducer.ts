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
import web3Reducer, { web3DefaultState, IWeb3State } from 'redux/web3/web3Reducer';

import { RootReducerAction } from './rootReducerActions';
import ActionType from './rootReducerActionTypes';

interface IState extends DefaultRootState {
  terminalApp: ITerminalAppState;
  terminal: ITerminalState;
  terminalController: IControllerState;
  web3: IWeb3State;
}

const combinedReducer = combineReducers({
  terminalApp: terminalAppReducer,
  terminal: terminalReducer,
  terminalController: terminalControllerReducer,
  web3: web3Reducer,
});

const rootReducer = (
  state: IState = {
    terminalApp: terminalAppDefaultState,
    terminal: terminalDefaultState,
    terminalController: controllerDefaultState,
    web3: web3DefaultState,
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
