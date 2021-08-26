import { Reducer, Action } from 'redux';
import { DefaultRootState } from 'react-redux';
import {
  TerminalControllerActions,
  terminalControllerHelp,
  terminalControllerClear,
  terminalControllerJoin,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

type Controller = {
  userActions?: Record<string, () => Action<any>>;
  child: Controller | null;
};

interface ITerminalControllerState extends DefaultRootState {
  flow: Controller;
  current: Controller | null;
}

const flow: Controller = {
  userActions: {
    // root
    help: terminalControllerHelp,
    clear: terminalControllerClear,
    join: terminalControllerJoin,
  },
  child: {
    // connect
    child: null,
  },
};

const terminalControllerDefaultState = { flow, current: flow };

const terminalControllerReducer: Reducer<ITerminalControllerState, TerminalControllerActions> = (
  state = terminalControllerDefaultState,
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

export type { ITerminalControllerState };
export { terminalControllerDefaultState };
export default terminalControllerReducer;
