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

export type TerminalAppActions = IActionSetAppLoading | IActionSetHydration | IActionPlayVideo;
export type { IActionSetAppLoading, IActionSetHydration, IActionPlayVideo };
export { setPageLoading, setPageHydration, playVideo };
