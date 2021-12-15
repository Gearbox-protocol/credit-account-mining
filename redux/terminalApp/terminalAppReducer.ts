import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { isVisited } from 'utils/API/visited/visited';
import { TerminalAppActions } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

interface ITerminalAppState extends DefaultRootState {
  appLoading: boolean;
  playVideo: boolean;
  appHydrated: boolean;
  visited: boolean;
  allClaimed: boolean;
}

const terminalAppDefaultState = {
  appLoading: false,
  appHydrated: false,
  playVideo: false,
  visited: isVisited(),
  allClaimed: false,
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
    case ActionType.SET_VISITED:
      return { ...state, visited: action.payload };
    case ActionType.SET_ALL_CLAIMED:
      return { ...state, allClaimed: action.payload };
    default:
      return state;
  }
};

export type { ITerminalAppState };
export { terminalAppDefaultState };
export default terminalAppReducer;
