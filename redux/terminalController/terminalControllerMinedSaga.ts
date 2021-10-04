import { put, takeEvery, select } from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import connectMetamask from 'utils/API/connect/connect';
import { assertError } from 'utils/API/errors/error-hub';
import { IClaimObject } from 'utils/API/join/join';
import countClaims from 'utils/API/mined/mined';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { subscribe } from 'redux/subscriptionController/subscriptionControllerActions';
import { setClaimObject } from 'redux/terminalApp/terminalAppAction';
import { IState } from 'redux/root/rootReducer';
import { controllerGotoRoot } from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* controllerMinedWorker(): Generator<any, void, any> {
  const {
    terminalApp: { claimObject },
  } = (yield select()) as IState;

  try {
    yield put(inputLock(true));

    yield put(loading(true));
    yield connectMetamask();
    yield put(subscribe());

    const state = (yield select()) as IState;
    yield assertError(state.subscriptionController.statusChanged, 'ACTION_ABORTED');
    const [safeClaim, amount]: [IClaimObject, number] = yield countClaims(claimObject || {});
    if (!claimObject) yield put(setClaimObject(safeClaim));
    yield put(loading(false));

    yield put(print({ msg: messages.accountsMined(amount), center: false }));
    yield put(inputLock(false));
  } catch (e: any) {
    yield put(loading(false));
    yield put(controllerGotoRoot());

    if (e.message) yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
  }
}

function* watchControllerMined() {
  yield takeEvery(ActionType.MINED, controllerMinedWorker);
}

export default watchControllerMined;
