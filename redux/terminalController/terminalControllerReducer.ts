import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { helpText } from 'utils/messages';

import {
  TerminalControllerActions,
  terminalControllerHelp,
  terminalControllerClear,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

interface IFunctionToCall {
  func: (arg?: any) => any;
  arg: any[];
}

type Controller = {
  userActions?: Record<string, IFunctionToCall>;
  systemActions?: Record<string, IFunctionToCall>;
  child: Controller | null;
};

interface ITerminalControllerState extends DefaultRootState {
  flow: Controller;
  current: Controller | null;
}

const flow: Controller = {
  userActions: {
    help: { func: terminalControllerHelp, arg: [helpText] },
    clear: { func: terminalControllerClear, arg: [] },
    join: { func: () => {}, arg: [] },
  },
  child: null,
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
