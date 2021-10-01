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
  children: Record<string, Controller> | null;
};

interface IControllerState extends DefaultRootState {
  root: Controller;
  current: Controller | null;
}

enum RootControllerActions {
  HELP = '/help',
  JOIN = '/join',
  MINED = '/mined',
  LINKS = '/links',
}

enum SystemActions {
  DEFAULT_ACTION = 'defaultAction',
}

enum ChoiceActions {
  YES = '/mine',
  NO = '/no',
}

const join: Controller = {
  children: {
    choice: {
      userActions: {
        [ChoiceActions.YES]: controllerJoinAccepted,
        [ChoiceActions.NO]: controllerJoinDenied,
        [SystemActions.DEFAULT_ACTION]: controllerJoinDenied,
      },
      children: null,
    },
  },
};

const root: Controller = {
  userActions: {
    [RootControllerActions.HELP]: controllerHelp,
    [RootControllerActions.JOIN]: controllerJoin,
    [RootControllerActions.MINED]: controllerMined,
    [RootControllerActions.LINKS]: controllerLinks,
  },
  children: {
    join,
  },
};

const controllerDefaultState = { root, current: root };

const controllerReducer: Reducer<IControllerState, ControllerActions> = (
  state = controllerDefaultState,
  action,
) => {
  switch (action.type) {
    case ActionType.GOTO: {
      if (!state.current) return state;
      if (!state.current.children) return state;
      if (!(action.payload in state.current.children)) return state;
      return {
        ...state,
        current: state.current.children[action.payload],
      };
    }
    case ActionType.GOTO_ROOT:
      return {
        ...state,
        current: state.root,
      };
    default: {
      return state;
    }
  }
};

export type { IControllerState };
export { controllerDefaultState, RootControllerActions, ChoiceActions, SystemActions };
export default controllerReducer;
