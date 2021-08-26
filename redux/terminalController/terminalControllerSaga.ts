import { put, takeEvery, select } from 'redux-saga/effects';
import { errorCommandNotFound } from 'utils/messages';
import { print, clear } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import {
  ITerminalControllerCommand,
  ITerminalControllerHelp,
  terminalControllerGotoRoot,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* terminalControllerCommandWorker({
  payload,
}: ITerminalControllerCommand): Generator<any, void, any> {
  const {
    terminalController: { current },
  } = (yield select()) as IState;
  try {
    if (!current || !current.userActions) throw new Error('No actions allowed');
    if (!current.userActions[payload]) throw new Error(`Command ${payload} not found`);
    const { func, arg } = current.userActions[payload];
    yield put(func(...arg));
  } catch (e) {
    yield put(terminalControllerGotoRoot());
    yield put(print({ msg: errorCommandNotFound(payload), center: false }));
  }
}

function* watchTerminalControllerCommand() {
  yield takeEvery(ActionType.COMMAND, terminalControllerCommandWorker);
}

function* terminalControllerHelpWorker({
  payload,
}: ITerminalControllerHelp): Generator<any, void, any> {
  yield put(print({ msg: payload, center: false }));
}

function* watchTerminalControllerHelpWorker() {
  yield takeEvery(ActionType.HELP, terminalControllerHelpWorker);
}

function* terminalControllerClearWorker(): Generator<any, void, any> {
  yield put(clear());
}

function* watchTerminalControllerClearWorker() {
  yield takeEvery(ActionType.C_CLEAR, terminalControllerClearWorker);
}

export {
  watchTerminalControllerCommand,
  watchTerminalControllerHelpWorker,
  watchTerminalControllerClearWorker,
};
