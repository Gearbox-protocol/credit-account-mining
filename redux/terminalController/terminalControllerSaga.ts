import { put, takeEvery, select } from 'redux-saga/effects';
import { messages, errors } from 'utils/text/terminalText';
import { checkMetamask, connectMetamask, checkNetwork } from 'utils/API/join';
import {
  print, clear, inputLock, loading,
} from 'redux/terminal/terminalAction';
import { playVideo } from 'redux/terminalApp/terminalAppAction';
import { IState } from 'redux/root/rootReducer';
import {
  IControllerCommand,
  controllerGotoRoot,
  controllerNext,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* controllerUserCommandWorker({ payload }: IControllerCommand): Generator<any, void, any> {
  const {
    terminalController: { current },
  } = (yield select()) as IState;
  try {
    if (!current || !current.userActions) throw new Error('No actions allowed');
    if (!current.userActions[payload]) throw new Error(`Command ${payload} not found`);
    const func = current.userActions[payload];
    yield put(func());
  } catch (e: any) {
    yield put(print({ msg: errors.commandNotFound(payload), center: false }));
  }
}

function* watchControllerUserCommandWorker() {
  yield takeEvery(ActionType.COMMAND, controllerUserCommandWorker);
}

function* controllerHelpWorker(): Generator<any, void, any> {
  try {
    yield put(print({ msg: messages.helpText, center: false }));
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerHelpWorker() {
  yield takeEvery(ActionType.HELP, controllerHelpWorker);
}

function* controllerClearWorker(): Generator<any, void, any> {
  try {
    yield put(clear());
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerClearWorker() {
  yield takeEvery(ActionType.C_CLEAR, controllerClearWorker);
}

function* controllerJoinWorker(): Generator<any, void, any> {
  try {
    yield put(inputLock(true));
    yield checkMetamask();
    yield put(controllerNext());

    yield put(loading(true));
    yield connectMetamask();
    yield checkNetwork();
    yield put(loading(false));
    yield put(print({ msg: messages.metamaskConnected, center: false }));
    yield put(controllerNext());

    yield put(inputLock(false));

    yield put(print({ msg: 'Finish', center: false }));
    yield put(playVideo(true));
  } catch (e: any) {
    yield put(loading(false));

    yield put(print({ msg: e.message, center: false }));

    yield put(controllerGotoRoot());
    yield put(inputLock(false));
  }
}

function* watchControllerJoinWorker() {
  yield takeEvery(ActionType.JOIN, controllerJoinWorker);
}

export {
  watchControllerUserCommandWorker,
  watchControllerHelpWorker,
  watchControllerClearWorker,
  watchControllerJoinWorker,
};
