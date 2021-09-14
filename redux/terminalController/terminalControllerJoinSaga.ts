import { ethers } from 'ethers';
import {
  put, takeEvery, select, delay,
} from 'redux-saga/effects';
import { messages } from 'utils/text/terminalText';
import { TerminalError, TerminalErrorCodes } from 'utils/API/errors/terminal-error';
import connectMetamask from 'utils/API/connect/connect';
import { MetamaskSubscription } from 'utils/API/subscription/subscription';
import {
  checkPermissions,
  isClaimed,
  claim,
  waitTransactionEnd,
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
  const {
    terminalApp: { subscriptionObject, claimObject },
  } = (yield select()) as IState;
  const safeSubscription = subscriptionObject || new MetamaskSubscription();

  try {
    yield put(inputLock(true));
    yield put(controllerGotoJoin());

    yield put(loading(true));
    const address: string = yield connectMetamask();
    yield safeSubscription.subscribeChanges();
    if (!subscriptionObject) yield put(setMetamaskSubscriptionObject(safeSubscription));
    yield put(loading(false));

    yield put(print({ msg: messages.metamaskConnected, center: false }));

    safeSubscription.checkStatus();
    const [account, accountsToMine]: [User, number] = yield checkPermissions(address);
    yield put(print({ msg: messages.amountOfMineAccounts(accountsToMine), center: false }));

    safeSubscription.checkStatus();
    const safeClaim: IClaimObject = yield isClaimed(claimObject || { user: account });
    if (!claimObject) yield put(setClaimObject(safeClaim));

    safeSubscription.checkStatus();
    yield put(controllerNext());
    yield put(inputLock(false));
    yield put(print({ msg: messages.claim, center: false }));
  } catch (e: any) {
    yield safeSubscription.resetStatus();
    yield put(loading(false));
    yield put(controllerGotoRoot());

    if (e.message) yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
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
    if (!claimObject) {
      throw new TerminalError({ code: TerminalErrorCodes.METAMASK_RELOGIN });
    }
    if (!subscriptionObject) {
      throw new TerminalError({ code: TerminalErrorCodes.METAMASK_RELOGIN });
    }

    yield put(inputLock(true));

    subscriptionObject.checkStatus();
    const [transaction, hash]: [ethers.ContractTransaction, string] = yield claim(claimObject);

    yield put(print({ msg: messages.almostDone, center: false }));
    yield put(print({ msg: messages.yourHash(hash), center: false }));
    yield put(loading(true));
    yield waitTransactionEnd(transaction);
    yield put(loading(false));

    yield put(print({ msg: messages.congratulations, center: false }));

    yield delay(500);
    yield put(playVideo(true));

    yield put(inputLock(false));
    yield put(controllerGotoRoot());
    yield subscriptionObject.resetStatus();
  } catch (e: any) {
    yield subscriptionObject?.resetStatus();
    yield put(loading(false));
    yield put(controllerGotoRoot());

    if (e.message) yield put(print({ msg: e.message, center: false }));
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
    throw new TerminalError({ code: TerminalErrorCodes.DENIED_BY_USER });
  } catch (e: any) {
    yield subscriptionObject?.resetStatus();
    yield put(controllerGotoRoot());
    if (e.message) yield put(print({ msg: e.message, center: false }));
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
