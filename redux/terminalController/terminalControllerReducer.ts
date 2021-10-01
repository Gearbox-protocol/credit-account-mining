import { Reducer, Action } from 'redux';
import { DefaultRootState } from 'react-redux';
import {
  ControllerActions,
  controllerHelp,
  controllerJoin,
  controllerJoinAccepted,
  controllerJoinDenied,
  controllerMined,
  controllerLinks,
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
  JOIN = 'join',
  MINED = 'mined',
  LINKS = 'links',
}

const root: Controller = {
  userActions: {
    [RootControllerActions.HELP]: controllerHelp,
    [RootControllerActions.JOIN]: controllerJoin,
    [RootControllerActions.MINED]: controllerMined,
    [RootControllerActions.LINKS]: controllerLinks,
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
