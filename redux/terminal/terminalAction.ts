import { ITerminalObject } from 'components/Terminal/Terminal';
import ActionType from './terminalActionTypes';

interface IActionSetLoading {
  type: ActionType.SET_TERMINAL;
  payload: ITerminalObject;
}

interface IPrintItem {
  msg: string;
  center: boolean;
}

interface IActionPrint {
  type: ActionType.PRINT;
  payload: IPrintItem;
}

interface IActionClear {
  type: ActionType.CLEAR;
}

const setTerminal = (payload: ITerminalObject): IActionSetLoading => ({
  type: ActionType.SET_TERMINAL,
  payload,
});

const print = (payload: IPrintItem): IActionPrint => ({
  type: ActionType.PRINT,
  payload,
});

const clear = (): IActionClear => ({
  type: ActionType.CLEAR,
});

export type TerminalActions = IActionSetLoading | IActionPrint | IActionClear;
export type { IActionSetLoading, IActionPrint, IActionClear };
export { setTerminal, print, clear };
