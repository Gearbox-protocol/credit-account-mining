import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { TerminalAppActions } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

interface ITerminalAppState extends DefaultRootState {
  appLoading: boolean;
  playVideo: boolean;
  appHydrated: boolean;
  firstTimeVisited: boolean;
}

const terminalAppDefaultState = {
  appLoading: false,
  appHydrated: false,
  playVideo: false,
  firstTimeVisited: true,
};

const terminalAppReducer: Reducer<ITerminalAppState, TerminalAppActions> = (
  state = terminalAppDefaultState,
  action,
) => {
  switch (action.type) {
    case ActionType.SET_APP_LOADER:
      return { ...state, appLoading: action.payload };
    case ActionType.SET_APP_HYDRATION:
      return { ...state, appHydrated: action.payload };
    case ActionType.PLAY_VIDEO:
      return { ...state, playVideo: action.payload };
    default:
      return state;
  }
};

export type { ITerminalAppState };
export { terminalAppDefaultState };
export default terminalAppReducer;
