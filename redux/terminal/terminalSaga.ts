import { put, takeEvery, select } from 'redux-saga/effects';
import { errorStrings } from 'utils/API/errors/error-hub';
import { print } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import { IActionPrint, IActionLockInput, IActionLoading } from './terminalAction';
import ActionType from './terminalActionTypes';

function* printWorker({ payload: { msg, center = false } }: IActionPrint) {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    yield terminal?.print(msg, center);
  } catch (e: any) {
    yield console.error(errorStrings.UNEXPECTED_ERROR);
  }
}

function* watchPrint() {
  yield takeEvery(ActionType.PRINT, printWorker);
}

function* clearWorker() {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    yield terminal?.clear();
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchClear() {
  yield takeEvery(ActionType.CLEAR, clearWorker);
}

function* lockWorker({ payload }: IActionLockInput) {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    yield terminal?.inputLock(payload);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchLock() {
  yield takeEvery(ActionType.LOCK, lockWorker);
}

function* loadingWorker({ payload }: IActionLoading) {
  try {
    const {
      terminal: { terminal },
    } = (yield select()) as IState;
    yield terminal?.setLoading(payload);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchLoading() {
  yield takeEvery(ActionType.TERMINAL_LOADING, loadingWorker);
}

export {
  watchPrint, watchClear, watchLock, watchLoading,
};
