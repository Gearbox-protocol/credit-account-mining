import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { ControllerActions } from './actions/terminalControllerActions';
import { ControllerUserActions } from './actions/terminalControllerUserActions';
import { ActionType, OptionalActions } from './terminalControllerActionTypes';
import root, { Controller, optionalActions } from './controllers/root';

interface IControllerState extends DefaultRootState {
  root: Controller;
  current: Controller | null;
}

const controllerDefaultState = { root, current: root };

const controllerReducer: Reducer<IControllerState, ControllerActions | ControllerUserActions> = (
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
export { controllerDefaultState };
export default controllerReducer;
