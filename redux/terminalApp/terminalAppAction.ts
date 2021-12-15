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

interface IActionSetAllClaimed {
  type: ActionType.SET_ALL_CLAIMED;
  payload: boolean;
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

const setAllClaimed = (payload: boolean): IActionSetAllClaimed => ({
  type: ActionType.SET_ALL_CLAIMED,
  payload,
});

export type TerminalAppActions =
  | IActionSetAppLoading
  | IActionSetHydration
  | IActionPlayVideo
  | IActionSetVisited
  | IActionSetAllClaimed;

export type {
  IActionSetAppLoading,
  IActionSetHydration,
  IActionPlayVideo,
  IActionSetVisited,
  IActionSetAllClaimed,
};
export {
  setPageLoading, setPageHydration, playVideo, setVisited, setAllClaimed,
};
