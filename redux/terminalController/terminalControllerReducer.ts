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
import {
  ActionType,
  RootControllerActions,
  SystemActions,
  OptionalActions,
  ChoiceActions,
} from './terminalControllerActionTypes';

type UserActions = Record<string, () => Action<any>>;

type Controller = {
  userActions?: UserActions;
  children: Record<string, Controller> | null;
};

interface IControllerState extends DefaultRootState {
  root: Controller;
  current: Controller | null;
}

const optionalActions: UserActions = {
  [OptionalActions.MINE]: controllerJoinAccepted,
};

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
    case ActionType.ADD_ACTION:
      if (!state.current) return state;
      if (!(action.payload in optionalActions)) return state;

      if (!state.current.userActions) {
        return {
          ...state,
          current: {
            ...state.current,
            userActions: {
              [action.payload]: optionalActions[action.payload],
            },
          },
        };
      }
      return {
        ...state,
        current: {
          ...state.current,
          userActions: {
            ...state.current.userActions,
            [action.payload]: optionalActions[action.payload],
          },
        },
      };

    default: {
      return state;
    }
  }
};

export type { IControllerState, OptionalActions };
export {
  controllerDefaultState, RootControllerActions, ChoiceActions, SystemActions,
};
export default controllerReducer;
