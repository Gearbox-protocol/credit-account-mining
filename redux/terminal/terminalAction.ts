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

const setTerminal = (payload: ITerminalObject): IActionSetLoading => ({
  type: ActionType.SET_TERMINAL,
  payload,
});

const print = (payload: IPrintItem): IActionPrint => ({
  type: ActionType.PRINT,
  payload,
});

export type TerminalActions = IActionSetLoading | IActionPrint;
export type { IActionSetLoading, IActionPrint };
export { setTerminal, print };
