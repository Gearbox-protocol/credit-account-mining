import { put, takeEvery, select } from 'redux-saga/effects';
import { errorCommandNotFound, helpText, metamaskConnected } from 'utils/messages';
import { checkMetamask, connectMetamask, checkNetwork } from 'utils/API/helpers';
import { print, clear } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import {
  ITerminalControllerCommand,
  terminalControllerGotoRoot,
  terminalControllerNext,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* terminalControllerUserCommandWorker({
  payload,
}: ITerminalControllerCommand): Generator<any, void, any> {
  const {
    terminalController: { current },
  } = (yield select()) as IState;
  try {
    if (!current || !current.userActions) throw new Error('No actions allowed');
    if (!current.userActions[payload]) throw new Error(`Command ${payload} not found`);
    const func = current.userActions[payload];
    yield put(func());
  } catch (e) {
    yield put(print({ msg: errorCommandNotFound(payload), center: false }));
    yield put(terminalControllerGotoRoot());
  }
}

function* watchTerminalControllerUserCommandWorker() {
  yield takeEvery(ActionType.COMMAND, terminalControllerUserCommandWorker);
}

function* terminalControllerHelpWorker(): Generator<any, void, any> {
  try {
    yield put(print({ msg: helpText, center: false }));
  } catch (e) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchTerminalControllerHelpWorker() {
  yield takeEvery(ActionType.HELP, terminalControllerHelpWorker);
}

function* terminalControllerClearWorker(): Generator<any, void, any> {
  try {
    yield put(clear());
  } catch (e) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchTerminalControllerClearWorker() {
  yield takeEvery(ActionType.C_CLEAR, terminalControllerClearWorker);
}

function* terminalControllerJoinWorker(): Generator<any, void, any> {
  try {
    yield checkMetamask();
    yield put(terminalControllerNext());
    yield connectMetamask();
    yield checkNetwork();
    yield put(print({ msg: metamaskConnected, center: false }));
    yield put(terminalControllerNext());

    yield put(print({ msg: 'hello world', center: false }));
  } catch (e) {
    yield put(print({ msg: e.message, center: false }));
    yield put(terminalControllerGotoRoot());
  }
}

function* watchTerminalControllerJoinWorker() {
  yield takeEvery(ActionType.JOIN, terminalControllerJoinWorker);
}

export {
  watchTerminalControllerUserCommandWorker,
  watchTerminalControllerHelpWorker,
  watchTerminalControllerClearWorker,
  watchTerminalControllerJoinWorker,
};
