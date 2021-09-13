import { ethers } from 'ethers';
import {
  put, takeEvery, select, delay,
} from 'redux-saga/effects';
import { messages, errors } from 'utils/text/terminalText';
import {
  connectMetamask,
  checkPermissions,
  isClaimed,
  claim,
  waitTransactionEnd,
  MetamaskSubscription,
  IClaimObject,
  User,
} from 'utils/API/join';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import {
  playVideo,
  setClaimObject,
  setMetamaskSubscriptionObject,
} from 'redux/terminalApp/terminalAppAction';
import { IState } from 'redux/root/rootReducer';
import {
  controllerGotoRoot,
  controllerNext,
  controllerGotoJoin,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* controllerJoinWorker(): Generator<any, void, any> {
  const subscriptionObject = new MetamaskSubscription();
  try {
    yield put(inputLock(true));
    yield put(controllerGotoJoin());

    yield put(loading(true));
    const address: string = yield connectMetamask();
    yield subscriptionObject.subscribeChanges();
    yield put(loading(false));
    yield put(print({ msg: messages.metamaskConnected, center: false }));

    yield subscriptionObject.checkStatus();
    const [account, accountsToMine]: [User, number] = yield checkPermissions(address);
    yield put(print({ msg: messages.amountOfMineAccounts(accountsToMine), center: false }));

    yield subscriptionObject.checkStatus();
    const claimObject: IClaimObject = yield isClaimed(address, account);
    yield put(setClaimObject(claimObject));
    yield put(setMetamaskSubscriptionObject(subscriptionObject));

    yield put(controllerNext());
    yield put(inputLock(false));
    yield put(print({ msg: messages.claim, center: false }));
  } catch (e: any) {
    yield subscriptionObject.unSubscribeChanges();
    yield put(loading(false));
    yield put(controllerGotoRoot());

    yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
    yield put(setClaimObject(null));
    yield put(setMetamaskSubscriptionObject(null));
  }
}

function* watchControllerJoinWorker() {
  yield takeEvery(ActionType.JOIN, controllerJoinWorker);
}

function* controllerJoinAcceptedWorker(): Generator<any, void, any> {
  const {
    terminalApp: { claimObject, subscriptionObject },
  } = (yield select()) as IState;
  try {
    if (!claimObject) throw new Error(errors.metamaskLogin);
    if (!subscriptionObject) throw new Error(errors.metamaskLogin);
    yield put(inputLock(true));

    yield subscriptionObject.checkStatus();
    const [transaction, hash]: [ethers.ContractTransaction, string] = yield claim(claimObject);

    yield put(print({ msg: messages.almostDone, center: false }));
    yield put(print({ msg: messages.yourHash(hash), center: false }));
    yield put(loading(true));
    yield waitTransactionEnd(transaction);
    yield put(loading(false));

    yield subscriptionObject.unSubscribeChanges();
    yield put(print({ msg: messages.congratulations, center: false }));

    yield delay(500);
    yield put(playVideo(true));

    yield put(inputLock(false));
    yield put(controllerGotoRoot());
  } catch (e: any) {
    yield subscriptionObject?.unSubscribeChanges();
    yield put(loading(false));
    yield put(controllerGotoRoot());

    yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
  }
}

function* watchControllerJoinAcceptedWorker() {
  yield takeEvery(ActionType.JOIN_ACCEPTED, controllerJoinAcceptedWorker);
}

function* controllerJoinDeniedWorker(): Generator<any, void, any> {
  const {
    terminalApp: { subscriptionObject },
  } = (yield select()) as IState;
  try {
    yield subscriptionObject?.unSubscribeChanges();
    yield put(controllerGotoRoot());
    yield put(print({ msg: errors.denied, center: false }));
    yield put(setClaimObject(null));
    yield put(setMetamaskSubscriptionObject(null));
  } catch (e: any) {
    yield subscriptionObject?.unSubscribeChanges();
    yield put(controllerGotoRoot());
    yield put(print({ msg: e.message, center: false }));
    yield put(setClaimObject(null));
    yield put(setMetamaskSubscriptionObject(null));
  }
}

function* watchControllerJoinDeniedWorker() {
  yield takeEvery(ActionType.JOIN_DENIED, controllerJoinDeniedWorker);
}

export {
  watchControllerJoinWorker,
  watchControllerJoinAcceptedWorker,
  watchControllerJoinDeniedWorker,
};
