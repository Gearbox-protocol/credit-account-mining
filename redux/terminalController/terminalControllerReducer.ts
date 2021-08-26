import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { TerminalControllerActions } from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

type Controller = {
  userActions?: Record<string, () => void>;
  systemActions?: Record<string, () => void>;
  child: Controller | null;
};

interface ITerminalControllerState extends DefaultRootState {
  flow: Controller | null;
  current: Controller | null;
}

const terminalControllerDefaultState = { flow: null, current: null };

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
