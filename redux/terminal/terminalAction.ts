import { ITerminalObject } from 'components/Terminal/Terminal';
import ActionType from './terminalActionTypes';

interface IActionSetTerminal {
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

interface IActionLockInput {
  type: ActionType.LOCK;
  payload: boolean;
}

const setTerminal = (payload: ITerminalObject): IActionSetTerminal => ({
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

const inputLock = (payload: boolean): IActionLockInput => ({
  type: ActionType.LOCK,
  payload,
});

export type TerminalActions = IActionSetTerminal | IActionPrint | IActionClear | IActionLockInput;
export type { IActionSetTerminal, IActionPrint, IActionClear, IActionLockInput };
export { setTerminal, print, clear, inputLock };
