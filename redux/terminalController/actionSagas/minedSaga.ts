import {
  put, call, takeEvery, select,
} from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import connectMetamask from 'utils/API/connect/connect';
import { IClaimObject } from 'utils/API/join/join';
import countClaims from 'utils/API/mined/mined';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { subscribe } from 'redux/subscription/subscriptionActions';
import { cancelOnStatusChange } from 'redux/subscription/subscriptionSaga';
import { setClaimObject } from 'redux/user/userAction';
import { IState } from 'redux/root/rootReducer';
import { controllerError, controllerGotoRoot } from '../actions/terminalControllerActions';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerMinedWorker() {
  try {
    const {
      user: { claimObject },
    } = (yield select()) as IState;
    yield put(inputLock(true));

    yield put(loading(true));
    yield call(connectMetamask);
    yield put(subscribe());

    const [safeClaim, amount]: [IClaimObject, number] = yield call(countClaims, claimObject || {});

    if (!claimObject) yield put(setClaimObject(safeClaim));
    yield put(loading(false));

    yield put(print({ msg: messages.accountsMined(amount), center: false }));
    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(controllerError({ msg: e.message, center: false }));
  }
}

function* watchControllerMined() {
  yield takeEvery(ActionType.MINED, cancelOnStatusChange(controllerMinedWorker));
}

export default watchControllerMined;
