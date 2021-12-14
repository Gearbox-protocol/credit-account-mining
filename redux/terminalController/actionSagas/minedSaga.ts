import {
  put, call, takeEvery, select,
} from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { getTypedError, TerminalError } from 'utils/API/errors/error-hub';
import connectMetamask from 'utils/API/connect/connect';
import { IClaimObject } from 'utils/API/join/join';
import countClaims from 'utils/API/mined/mined';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { subscribe } from 'redux/subscription/subscriptionActions';
import { cancelOnStatusChange } from 'redux/subscription/subscriptionSaga';
import { setClaimObject } from 'redux/web3/web3Action';
import { IState } from 'redux/root/rootReducer';
import { controllerGotoRoot } from '../actions/terminalControllerActions';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerMinedWorker() {
  try {
    const {
      web3: { claimObject },
    } = (yield select()) as IState;
    yield put(inputLock(true));

    yield put(loading(true));
    yield call(connectMetamask);
    yield put(subscribe());

    const [safeClaim, amount]: [IClaimObject, number] = yield call(countClaims, claimObject || {});

    if (!claimObject) yield put(setClaimObject(safeClaim));
    yield put(loading(false));

    yield put(print({ msg: messages.accountsMined(amount) }));
    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(loading(false));
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
    yield put(inputLock(false));
  }
}

function* watchControllerMined() {
  yield takeEvery(ActionType.MINED, cancelOnStatusChange(controllerMinedWorker));
}

export default watchControllerMined;
