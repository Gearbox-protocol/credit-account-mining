import { put, takeEvery, select } from 'redux-saga/effects';
import { messages } from 'utils/text/terminalText';
import connectMetamask from 'utils/API/connect/connect';
import { MetamaskSubscription } from 'utils/API/subscription/subscription';
import { IClaimObject } from 'utils/API/join/join';
import countClaims from 'utils/API/count-claims/count-claims';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { setClaimObject, setMetamaskSubscriptionObject } from 'redux/terminalApp/terminalAppAction';
import { IState } from 'redux/root/rootReducer';
import { controllerGotoRoot } from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* controllerCountClaimsWorker(): Generator<any, void, any> {
  const {
    terminalApp: { subscriptionObject, claimObject },
  } = (yield select()) as IState;
  const safeSubscription = subscriptionObject || new MetamaskSubscription();

  try {
    yield put(inputLock(true));

    yield put(loading(true));
    yield connectMetamask();
    yield safeSubscription.subscribeChanges();
    if (!subscriptionObject) yield put(setMetamaskSubscriptionObject(safeSubscription));
    yield put(loading(false));

    yield put(print({ msg: messages.metamaskConnected, center: false }));

    safeSubscription.checkStatus();
    const [safeClaim, amount]: [IClaimObject, number] = yield countClaims(claimObject || {});
    if (!claimObject) yield put(setClaimObject(safeClaim));

    yield put(print({ msg: messages.accountsMined(amount), center: false }));
    yield put(inputLock(false));
  } catch (e: any) {
    yield safeSubscription.resetStatus();
    yield put(loading(false));
    yield put(controllerGotoRoot());

    if (e.message) yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
  }
}

function* watchControllerCountClaimsWorker() {
  yield takeEvery(ActionType.COUNT_CLAIMS, controllerCountClaimsWorker);
}

export default watchControllerCountClaimsWorker;
