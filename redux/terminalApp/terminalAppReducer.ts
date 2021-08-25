import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { TerminalAppActions } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

interface ITerminalAppState extends DefaultRootState {
  pageLoading: boolean;
  pageHydrated: boolean;
}

const terminalAppDefaultState = { pageLoading: false, pageHydrated: false };

const terminalAppReducer: Reducer<ITerminalAppState, TerminalAppActions> = (
  state = terminalAppDefaultState,
  action,
) => {
  switch (action.type) {
    case ActionType.SET_APP_LOADER:
      return { ...state, appLoading: action.payload };
    case ActionType.SET_APP_HYDRATION:
      return { ...state, appHydrated: action.payload };
    default:
      return state;
  }
};

export type { ITerminalAppState };
export { terminalAppDefaultState };
export default terminalAppReducer;
