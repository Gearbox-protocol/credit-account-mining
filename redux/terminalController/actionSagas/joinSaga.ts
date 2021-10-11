import { ethers } from 'ethers';
import {
  put, takeEvery, select, delay,
} from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
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
import { subscribe } from 'redux/subscription/subscriptionActions';
import { cancelOnStatusChange } from 'redux/subscription/subscriptionSaga';
import { playVideo, setVisited } from 'redux/terminalApp/terminalAppAction';
import { setClaimObject, setUser, setAddress } from 'redux/user/userAction';
import { IState } from 'redux/root/rootReducer';
import {
  controllerGotoRoot,
  controllerGoto,
  controllerAddAction,
  controllerJoinContinue,
  controllerError,
} from '../terminalControllerActions';
import { ActionType, OptionalActions } from '../terminalControllerActionTypes';

function* controllerJoinWorker() {
  try {
    yield put(inputLock(true));
    yield put(controllerGoto('join'));

    yield put(loading(true));
    const address: string = yield connectMetamask();
    yield put(subscribe());
    yield put(loading(false));

    yield put(setAddress(address));
    yield put(print({ msg: messages.metamaskConnected, center: false }));
    yield put(controllerGoto('notGaryQuestion'));

    const {
      terminalApp: { visited },
    } = (yield select()) as IState;
    if (!visited) {
      yield put(print({ msg: messages.notGaryQuestion, center: false }));
      yield put(setVisited(true));
    } else {
      yield put(controllerJoinContinue());
    }

    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(controllerError({ msg: e.message, center: false }));
  }
}

function* watchControllerJoin() {
  yield takeEvery(ActionType.JOIN, controllerJoinWorker);
}

function* controllerIsGaryWorker() {
  try {
    yield put(inputLock(true));

    yield put(print({ msg: messages.isGary, center: false }));
    yield put(controllerJoinContinue());

    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(controllerError({ msg: e.message, center: false }));
  }
}

function* watchControllerIsGary() {
  yield takeEvery(ActionType.IS_GARY, controllerIsGaryWorker);
}

function* controllerJoinContinueWorker() {
  try {
    yield put(inputLock(true));
    yield put(controllerGoto('notGary'));

    const {
      user: { claimObject, user, address },
      subscription: { statusChanged },
    } = (yield select()) as IState;
    if (statusChanged) throw new TerminalError({ code: 'ACTION_ABORTED' });
    if (!address) throw new TerminalError({ code: 'UNEXPECTED_ERROR' });

    yield put(print({ msg: messages.permissionCheckingStarted, center: false }));
    const safeUser: User = yield checkPermissions(address);
    yield put(print({ msg: messages.amountOfMineAccounts, center: false }));

    const safeClaim: IClaimObject = yield isClaimed(claimObject || {}, safeUser);
    if (!claimObject) yield put(setClaimObject(safeClaim));
    if (!user) yield put(setUser(safeUser));

    yield put(controllerGoto('choice'));
    yield put(print({ msg: messages.claim, center: false }));

    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(controllerError({ msg: e.message, center: false }));
    if (e.code === 'DENIED_BY_USER') yield put(controllerAddAction(OptionalActions.MINE));
  }
}

function* watchControllerJoinContinue() {
  yield takeEvery([ActionType.JOIN_CONTINUE], cancelOnStatusChange(controllerJoinContinueWorker));
}

function* controllerJoinAcceptedWorker() {
  try {
    yield put(inputLock(true));

    const {
      user: { claimObject, user },
      subscription: { isSubscribed, statusChanged },
    } = (yield select()) as IState;
    if (!claimObject || !user || !isSubscribed) {
      throw new TerminalError({ code: 'METAMASK_RELOGIN' });
    }
    if (statusChanged) throw new TerminalError({ code: 'ACTION_ABORTED' });

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
    yield delay(8000);
    yield put(playVideo(true));

    yield put(inputLock(false));
    yield put(controllerGotoRoot());
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(controllerError({ msg: e.message, center: false }));
    if (e.code === 'DENIED_BY_USER') yield put(controllerAddAction(OptionalActions.MINE));
  }
}

function* watchControllerJoinAccepted() {
  yield takeEvery(ActionType.JOIN_ACCEPTED, controllerJoinAcceptedWorker);
}

function* controllerJoinDeniedWorker() {
  try {
    yield put(inputLock(true));
    throw new TerminalError({ code: 'DENIED_BY_USER' });
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(controllerError({ msg: e.message, center: false }));
    if (e.code === 'DENIED_BY_USER') yield put(controllerAddAction(OptionalActions.MINE));
  }
}

function* watchControllerJoinDenied() {
  yield takeEvery(ActionType.JOIN_DENIED, controllerJoinDeniedWorker);
}

export {
  watchControllerJoin,
  watchControllerJoinAccepted,
  watchControllerJoinDenied,
  watchControllerJoinContinue,
  watchControllerIsGary,
};
