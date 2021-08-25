import ActionTypeLoading from './terminalAppActionTypes';

interface IActionSetAppLoading {
  type: ActionTypeLoading.SET_APP_LOADER;
  payload: boolean;
}

interface IActionSetHydration {
  type: ActionTypeLoading.SET_APP_HYDRATION;
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

export type TerminalAppActions = IActionSetAppLoading | IActionSetHydration;
export type { IActionSetAppLoading, IActionSetHydration };
export { setPageLoading, setPageHydration };
