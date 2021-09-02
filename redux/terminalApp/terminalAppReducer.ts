import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { IClaimObject } from 'utils/API/join';
import { TerminalAppActions } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

interface ITerminalAppState extends DefaultRootState {
  appLoading: boolean;
  playVideo: boolean;
  appHydrated: boolean;
  account: IClaimObject | null;
}

const terminalAppDefaultState = {
  appLoading: false,
  appHydrated: false,
  playVideo: false,
  account: null,
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
    case ActionType.SET_ACCOUNT:
      return { ...state, account: action.payload };
    default:
      return state;
  }
};

export type { ITerminalAppState };
export { terminalAppDefaultState };
export default terminalAppReducer;
