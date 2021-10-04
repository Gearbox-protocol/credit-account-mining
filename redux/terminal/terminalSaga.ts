import { put, takeEvery, select } from 'redux-saga/effects';
import errorStrings from 'utils/API/errors/TerminalError/error-strings';
import { print } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import { IActionPrint, IActionLockInput, IActionLoading } from './terminalAction';
import ActionType from './terminalActionTypes';

function* printWorker({ payload: { msg, center } }: IActionPrint): Generator<any, void, any> {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    terminal?.print(msg, center);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR, center: false }));
  }
}

function* watchPrint() {
  yield takeEvery(ActionType.PRINT, printWorker);
}

function* clearWorker(): Generator<any, void, any> {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    terminal?.clear();
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR, center: false }));
  }
}

function* watchClear() {
  yield takeEvery(ActionType.CLEAR, clearWorker);
}

function* lockWorker({ payload }: IActionLockInput): Generator<any, void, any> {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    terminal?.inputLock(payload);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR, center: false }));
  }
}

function* watchLock() {
  yield takeEvery(ActionType.LOCK, lockWorker);
}

function* loadingWorker({ payload }: IActionLoading): Generator<any, void, any> {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    if (payload) {
      terminal?.startLoading();
    } else {
      terminal?.endLoading();
    }
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR, center: false }));
  }
}

function* watchLoading() {
  yield takeEvery(ActionType.TERMINAL_LOADING, loadingWorker);
}

export {
  watchPrint, watchClear, watchLock, watchLoading,
};
