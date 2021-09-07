import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { IClaimObject, IMetamaskSubscription } from 'utils/API/join';
import { TerminalAppActions } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

interface ITerminalAppState extends DefaultRootState {
  appLoading: boolean;
  playVideo: boolean;
  appHydrated: boolean;
  claimObject: IClaimObject | null;
  subscriptionObject: IMetamaskSubscription | null;
}

const terminalAppDefaultState = {
  appLoading: false,
  appHydrated: false,
  playVideo: false,
  claimObject: null,
  subscriptionObject: null,
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
    case ActionType.SET_CLAIM_OBJECT:
      return { ...state, claimObject: action.payload };
    case ActionType.SET_SUBSCRIPTION_OBJECT:
      return { ...state, subscriptionObject: action.payload };
    default:
      return state;
  }
};

export type { ITerminalAppState };
export { terminalAppDefaultState };
export default terminalAppReducer;
