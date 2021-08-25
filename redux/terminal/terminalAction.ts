import { ITerminalObject } from 'components/Terminal/Terminal';
import ActionType from './terminalActionTypes';

interface IActionSetLoading {
  type: ActionType.SET_TERMINAL;
  payload: ITerminalObject;
}

const setTerminal = (payload: ITerminalObject): IActionSetLoading => ({
  type: ActionType.SET_TERMINAL,
  payload,
});

export type TerminalActions = IActionSetLoading;
export type { IActionSetLoading };
export { setTerminal };
