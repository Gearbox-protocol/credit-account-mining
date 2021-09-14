import { Reducer, Action } from 'redux';
import { DefaultRootState } from 'react-redux';
import {
  ControllerActions,
  controllerHelp,
  controllerClear,
  controllerJoin,
  controllerJoinAccepted,
  controllerJoinDenied,
  controllerMined,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

type Controller = {
  userActions?: Record<string, () => Action<any>>;
  child: Controller | null;
};

interface IControllerState extends DefaultRootState {
  root: Controller;
  join: Controller;
  current: Controller | null;
}

enum RootControllerActions {
  HELP = 'help',
  CLEAR = 'clear',
  JOIN = 'join',
  MINED = 'mined',
}

const root: Controller = {
  userActions: {
    [RootControllerActions.HELP]: controllerHelp,
    [RootControllerActions.CLEAR]: controllerClear,
    [RootControllerActions.JOIN]: controllerJoin,
    [RootControllerActions.MINED]: controllerMined,
  },
  child: null,
};

const join: Controller = {
  child: {
    userActions: {
      y: controllerJoinAccepted,
      n: controllerJoinDenied,
    },
    child: null,
  },
};

const controllerDefaultState = { root, join, current: root };

const controllerReducer: Reducer<IControllerState, ControllerActions> = (
  state = controllerDefaultState,
  action,
) => {
  switch (action.type) {
    case ActionType.NEXT: {
      if (!state.current) return state;
      return {
        ...state,
        current: state.current.child,
      };
    }
    case ActionType.GOTO_ROOT:
      return {
        ...state,
        current: state.root,
      };
    case ActionType.GOTO_JOIN:
      return {
        ...state,
        current: state.join,
      };
    default: {
      return state;
    }
  }
};

export type { IControllerState };
export { controllerDefaultState, RootControllerActions };
export default controllerReducer;
