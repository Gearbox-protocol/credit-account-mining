import { ethers } from 'ethers';
import {
  put, takeEvery, select, delay,
} from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
import { isAborted } from 'utils/API/errors/error-hub';
import connectMetamask from 'utils/API/connect/connect';
import {
  checkPermissions,
  isClaimed,
  claim,
  waitTransactionEnd,
  IClaimObject,
  User,
} from 'utils/API/join/join';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { subscribe } from 'redux/subscriptionController/subscriptionControllerActions';
import { playVideo, setClaimObject, setUser } from 'redux/terminalApp/terminalAppAction';
import { IState } from 'redux/root/rootReducer';
import { controllerGotoRoot, controllerGoto } from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* controllerJoinWorker(): Generator<any, void, any> {
  const {
    terminalApp: { claimObject, user },
  } = (yield select()) as IState;

  try {
    yield put(inputLock(true));
    yield put(controllerGoto('join'));

    yield put(loading(true));
    const address: string = yield connectMetamask();
    yield put(subscribe());
    yield put(loading(false));

    yield put(print({ msg: messages.metamaskConnected, center: false }));

    let state = (yield select()) as IState;
    yield isAborted(state.subscriptionController.statusChanged);

    yield put(print({ msg: messages.permissionCheckingStarted, center: false }));
    const account: User = yield checkPermissions(address);
    yield put(print({ msg: messages.amountOfMineAccounts, center: false }));

    state = (yield select()) as IState;
    yield isAborted(state.subscriptionController.statusChanged);
    const safeClaim: IClaimObject = yield isClaimed(claimObject || {}, user || account);
    if (!claimObject) yield put(setClaimObject(safeClaim));
    if (!user) yield put(setUser(account));

    state = (yield select()) as IState;
    yield isAborted(state.subscriptionController.statusChanged);
    yield put(controllerGoto('choice'));
    yield put(print({ msg: messages.claim, center: false }));
    yield put(inputLock(false));
  } catch (e: any) {
    yield put(loading(false));
    yield put(controllerGotoRoot());

    if (e.message) yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
  }
}

function* watchControllerJoin() {
  yield takeEvery(ActionType.JOIN, controllerJoinWorker);
}

function* controllerJoinAcceptedWorker(): Generator<any, void, any> {
  const {
    terminalApp: { claimObject, user },
    subscriptionController: { isSubscribed },
  } = (yield select()) as IState;
  try {
    if (!claimObject || !user || !isSubscribed) {
      throw new TerminalError({ code: 'METAMASK_RELOGIN' });
    }

    yield put(inputLock(true));

    const state = (yield select()) as IState;
    yield isAborted(state.subscriptionController.statusChanged);
    yield put(loading(true));
    const [transaction, hash]: [ethers.ContractTransaction, string] = yield claim(
      claimObject,
      user,
    );
    yield put(loading(false));

    yield put(print({ msg: messages.almostDone, center: false }));
    yield put(loading(true));
    yield waitTransactionEnd(transaction);
    yield put(loading(false));

    yield put(print({ msg: messages.yourHash(hash), center: false }));
    yield delay(500);
    yield put(playVideo(true));

    yield put(inputLock(false));
    yield put(controllerGotoRoot());
  } catch (e: any) {
    yield put(loading(false));
    yield put(controllerGotoRoot());

    if (e.message) yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
  }
}

function* watchControllerJoinAccepted() {
  yield takeEvery(ActionType.JOIN_ACCEPTED, controllerJoinAcceptedWorker);
}

function* controllerJoinDeniedWorker(): Generator<any, void, any> {
  try {
    throw new TerminalError({ code: 'DENIED_BY_USER' });
  } catch (e: any) {
    yield put(controllerGotoRoot());
    if (e.message) yield put(print({ msg: e.message, center: false }));
  }
}

function* watchControllerJoinDenied() {
  yield takeEvery(ActionType.JOIN_DENIED, controllerJoinDeniedWorker);
}

export { watchControllerJoin, watchControllerJoinAccepted, watchControllerJoinDenied };
