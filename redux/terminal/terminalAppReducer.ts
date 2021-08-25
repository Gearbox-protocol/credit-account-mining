import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { ITerminalObject } from 'components/Terminal/Terminal';
import { TerminalActions } from './terminalAction';
import ActionType from './terminalActionTypes';

interface ITerminalState extends DefaultRootState {
  terminal: ITerminalObject | null;
}

const terminalDefaultState = { terminal: null };

const terminalReducer: Reducer<ITerminalState, TerminalActions> = (
  state = terminalDefaultState,
  action,
) => {
  switch (action.type) {
    case ActionType.SET_TERMINAL:
      return { ...state, terminal: action.payload };
    case ActionType.PRINT: {
      state.terminal?.print(action.payload.msg, action.payload.center);
      return state;
    }
    default:
      return state;
  }
};

export type { ITerminalState };
export { terminalDefaultState };
export default terminalReducer;
