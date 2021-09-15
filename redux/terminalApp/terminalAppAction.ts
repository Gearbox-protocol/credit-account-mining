import { IClaimObject, User } from 'utils/API/join/join';
import ActionTypeLoading from './terminalAppActionTypes';

interface IActionSetAppLoading {
  type: ActionTypeLoading.SET_APP_LOADER;
  payload: boolean;
}

interface IActionSetHydration {
  type: ActionTypeLoading.SET_APP_HYDRATION;
  payload: boolean;
}

interface IActionPlayVideo {
  type: ActionTypeLoading.PLAY_VIDEO;
  payload: boolean;
}

interface IActionSetClaimObject {
  type: ActionTypeLoading.SET_CLAIM_OBJECT;
  payload: IClaimObject | null;
}

interface IActionSetUser {
  type: ActionTypeLoading.SET_USER;
  payload: User | null;
}

const setPageLoading = (payload: boolean): IActionSetAppLoading => ({
  type: ActionTypeLoading.SET_APP_LOADER,
  payload,
});

const setPageHydration = (payload: boolean): IActionSetHydration => ({
  type: ActionTypeLoading.SET_APP_HYDRATION,
  payload,
});

const playVideo = (payload: boolean): IActionPlayVideo => ({
  type: ActionTypeLoading.PLAY_VIDEO,
  payload,
});

const setClaimObject = (payload: IClaimObject | null): IActionSetClaimObject => ({
  type: ActionTypeLoading.SET_CLAIM_OBJECT,
  payload,
});

const setUser = (payload: User | null): IActionSetUser => ({
  type: ActionTypeLoading.SET_USER,
  payload,
});

export type TerminalAppActions =
  | IActionSetAppLoading
  | IActionSetHydration
  | IActionPlayVideo
  | IActionSetClaimObject
  | IActionSetUser;
export type {
  IActionSetAppLoading,
  IActionSetHydration,
  IActionPlayVideo,
  IActionSetClaimObject,
  IActionSetUser,
};
export {
  setPageLoading, setPageHydration, playVideo, setClaimObject, setUser,
};
