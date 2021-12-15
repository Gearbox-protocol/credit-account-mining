import { put, takeEvery, call } from 'redux-saga/effects';
import { errorStrings, TerminalError, getTypedError } from 'utils/API/errors/error-hub';
import { print } from 'redux/terminal/terminalAction';
import { setVisited } from 'utils/API/visited/visited';
import countClaims from 'utils/API/mined/mined';
import { store } from 'redux/store';
import {
  IActionSetVisited,
  setClaimedCount,
  incCounter,
  IActionResetCounter,
  IActionInitCounter,
} from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

function* setVisitedWorker({ payload }: IActionSetVisited) {
  try {
    yield call(setVisited, payload);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchSetVisited() {
  yield takeEvery(ActionType.SET_VISITED, setVisitedWorker);
}

const handleClaimed = () => store.dispatch(incCounter());

function* initCounterWorker({ payload }: IActionInitCounter) {
  try {
    payload.miningAccount.on('Claimed', handleClaimed);
    const amount: number = yield call(countClaims, payload);
    yield put(setClaimedCount(amount));
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* watchInitCounter() {
  yield takeEvery(ActionType.INIT_COUNTER, initCounterWorker);
}

function* resetCounterWorker({ payload }: IActionResetCounter) {
  try {
    payload.miningAccount.off('Claimed', handleClaimed);
    yield put(setClaimedCount(0));
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* watchResetCounter() {
  yield takeEvery(ActionType.RESET_COUNTER, resetCounterWorker);
}

export { watchSetVisited, watchInitCounter, watchResetCounter };
