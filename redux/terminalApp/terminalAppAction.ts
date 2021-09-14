import { IClaimObject, User } from 'utils/API/join';
import { IMetamaskSubscription } from 'utils/API/subscription/subscription';
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

interface IActionSetSubscriptionObject {
  type: ActionTypeLoading.SET_SUBSCRIPTION_OBJECT;
  payload: IMetamaskSubscription | null;
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

const setMetamaskSubscriptionObject = (
  payload: IMetamaskSubscription | null,
): IActionSetSubscriptionObject => ({
  type: ActionTypeLoading.SET_SUBSCRIPTION_OBJECT,
  payload,
});

export type TerminalAppActions =
  | IActionSetAppLoading
  | IActionSetHydration
  | IActionPlayVideo
  | IActionSetClaimObject
  | IActionSetSubscriptionObject
  | IActionSetUser;
export type {
  IActionSetAppLoading,
  IActionSetHydration,
  IActionPlayVideo,
  IActionSetClaimObject,
  IActionSetSubscriptionObject,
  IActionSetUser,
};
export {
  setPageLoading,
  setPageHydration,
  playVideo,
  setClaimObject,
  setMetamaskSubscriptionObject,
  setUser,
};
