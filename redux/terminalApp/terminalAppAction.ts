import { IClaimObject } from 'utils/API/web3/make-claim';
import ActionType from './terminalAppActionTypes';

interface IActionSetAppLoading {
  type: ActionType.SET_APP_LOADER;
  payload: boolean;
}

interface IActionSetHydration {
  type: ActionType.SET_APP_HYDRATION;
  payload: boolean;
}

interface IActionPlayVideo {
  type: ActionType.PLAY_VIDEO;
  payload: boolean;
}

interface IActionSetVisited {
  type: ActionType.SET_VISITED;
  payload: boolean;
}

interface IActionSetClaimedCount {
  type: ActionType.SET_CLAIMED_COUNT;
  payload: number;
}

interface IActionInitCounter {
  type: ActionType.INIT_COUNTER;
  payload: IClaimObject;
}

interface IActionResetCounter {
  type: ActionType.RESET_COUNTER;
  payload: IClaimObject;
}

interface IActionIncCounter {
  type: ActionType.INC_CLAIMED_COUNT;
}

const setPageLoading = (payload: boolean): IActionSetAppLoading => ({
  type: ActionType.SET_APP_LOADER,
  payload,
});

const setPageHydration = (payload: boolean): IActionSetHydration => ({
  type: ActionType.SET_APP_HYDRATION,
  payload,
});

const playVideo = (payload: boolean): IActionPlayVideo => ({
  type: ActionType.PLAY_VIDEO,
  payload,
});

const setVisited = (payload: boolean): IActionSetVisited => ({
  type: ActionType.SET_VISITED,
  payload,
});

const setClaimedCount = (payload: number): IActionSetClaimedCount => ({
  type: ActionType.SET_CLAIMED_COUNT,
  payload,
});

const initCounter = (payload: IClaimObject): IActionInitCounter => ({
  type: ActionType.INIT_COUNTER,
  payload,
});

const resetCounter = (payload: IClaimObject): IActionResetCounter => ({
  type: ActionType.RESET_COUNTER,
  payload,
});

const incCounter = (): IActionIncCounter => ({
  type: ActionType.INC_CLAIMED_COUNT,
});

export type TerminalAppActions =
  | IActionSetAppLoading
  | IActionSetHydration
  | IActionPlayVideo
  | IActionSetVisited
  | IActionSetClaimedCount
  | IActionInitCounter
  | IActionResetCounter
  | IActionIncCounter;
export type {
  IActionSetAppLoading,
  IActionSetHydration,
  IActionPlayVideo,
  IActionSetVisited,
  IActionSetClaimedCount,
  IActionInitCounter,
  IActionResetCounter,
  IActionIncCounter,
};
export {
  setPageLoading,
  setPageHydration,
  playVideo,
  setVisited,
  setClaimedCount,
  initCounter,
  incCounter,
  resetCounter,
};
