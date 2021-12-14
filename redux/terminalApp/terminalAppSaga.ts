import {
  put, takeEvery, call, select,
} from 'redux-saga/effects';
import { errorStrings, TerminalError, getTypedError } from 'utils/API/errors/error-hub';
import { print } from 'redux/terminal/terminalAction';
import { setVisited } from 'utils/API/visited/visited';
import makeClaim, { IClaimObject } from 'utils/API/web3/make-claim';
import countClaims from 'utils/API/mined/mined';
import { setClaimObject } from 'redux/web3/web3Action';
import { store } from 'redux/store';
import { IState } from 'redux/root/rootReducer';
import { IActionSetVisited, setClaimedCount, incCounter } from './terminalAppAction';
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

function* initCounterWorker() {
  try {
    const {
      web3: { claimObject },
    } = (yield select()) as IState;

    if (!claimObject) {
      const safeClaim: IClaimObject = yield call(makeClaim, claimObject || {});
      yield put(setClaimObject(safeClaim));

      safeClaim.miningAccount.on('Claimed', handleClaimed);

      const [, amount]: [IClaimObject, number] = yield call(countClaims, safeClaim);
      yield put(setClaimedCount(amount));
    }
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* watchInitCounter() {
  yield takeEvery(ActionType.INIT_COUNTER, initCounterWorker);
}

function* resetCounterWorker() {
  try {
    const {
      web3: { claimObject },
    } = (yield select()) as IState;

    if (claimObject) {
      claimObject.miningAccount.off('Claimed', handleClaimed);

      yield put(setClaimedCount(0));
      yield put(setClaimObject(null));
    }
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* watchResetCounter() {
  yield takeEvery(ActionType.RESET_COUNTER, resetCounterWorker);
}

export { watchSetVisited, watchInitCounter, watchResetCounter };
