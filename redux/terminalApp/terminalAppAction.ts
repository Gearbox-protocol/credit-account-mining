import { IClaimObject } from 'utils/API/join';
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

interface IActionSetAccount {
  type: ActionTypeLoading.SET_CLAIM_OBJECT;
  payload: IClaimObject | null;
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

const setAccount = (payload: IClaimObject | null): IActionSetAccount => ({
  type: ActionTypeLoading.SET_CLAIM_OBJECT,
  payload,
});

export type TerminalAppActions =
  | IActionSetAppLoading
  | IActionSetHydration
  | IActionPlayVideo
  | IActionSetAccount;
export type { IActionSetAppLoading, IActionSetHydration, IActionPlayVideo, IActionSetAccount };
export { setPageLoading, setPageHydration, playVideo, setAccount };
