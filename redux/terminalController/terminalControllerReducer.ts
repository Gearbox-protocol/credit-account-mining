import { Reducer, Action } from 'redux';
import { DefaultRootState } from 'react-redux';
import {
  ControllerActions,
  controllerHelp,
  controllerClear,
  controllerJoin,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

type Controller = {
  userActions?: Record<string, () => Action<any>>;
  child: Controller | null;
};

interface IControllerState extends DefaultRootState {
  flow: Controller;
  current: Controller | null;
}

const flow: Controller = {
  userActions: {
    // root
    help: controllerHelp,
    clear: controllerClear,
    join: controllerJoin,
  },
  child: {
    // connect
    child: null,
  },
};

const controllerDefaultState = { flow, current: flow };

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
        current: state.flow,
      };
    default: {
      return state;
    }
  }
};

export type { IControllerState };
export { controllerDefaultState };
export default controllerReducer;
