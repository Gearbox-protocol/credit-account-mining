import { ethers } from 'ethers';
import {
  put, takeEvery, select, delay, call,
} from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { getTypedError, TerminalError } from 'utils/API/errors/error-hub';
import connectMetamask from 'utils/API/web3/connect-metamask';
import {
  checkPermissions, isClaimed, claim, waitTransactionEnd, User,
} from 'utils/API/join/join';
import makeClaim, { IClaimObject } from 'utils/API/web3/make-claim';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { cancelOnDisconnectWeb3 } from 'redux/subscription/subscriptionSaga';
import { playVideo, setVisited } from 'redux/terminalApp/terminalAppAction';
import { setUser, setAddress } from 'redux/web3/web3Action';
import { IState } from 'redux/root/rootReducer';
import { controllerJoinContinue } from '../actions/terminalControllerUserActions';
import {
  controllerGotoRoot,
  controllerGoto,
  controllerAddAction,
} from '../actions/terminalControllerActions';
import { ActionType, OptionalActions } from '../terminalControllerActionTypes';

function* controllerJoinWorker() {
  try {
    yield put(inputLock(true));
    yield put(controllerGoto('join'));

    yield put(loading(true));
    const address: string = yield call(connectMetamask);
    yield put(loading(false));

    yield put(setAddress(address));
    yield put(print({ msg: messages.metamaskConnected }));
    yield put(controllerGoto('isGaryQuestion'));

    const {
      terminalApp: { visited },
    } = (yield select()) as IState;
    if (!visited) {
      yield put(print({ msg: messages.isGaryQuestion }));
      yield put(setVisited(true));
    } else {
      yield put(controllerJoinContinue());
    }

    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(loading(false));
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
    yield put(inputLock(false));
  }
}

function* watchControllerJoin() {
  yield takeEvery(ActionType.JOIN, controllerJoinWorker);
}

function* controllerIsGaryWorker() {
  try {
    yield put(inputLock(true));

    yield put(print({ msg: messages.isGary }));
    yield put(controllerJoinContinue());

    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(loading(false));
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
    yield put(inputLock(false));
  }
}

function* watchControllerIsGary() {
  yield takeEvery([ActionType.IS_GARY], cancelOnDisconnectWeb3(controllerIsGaryWorker));
}

function* controllerJoinContinueWorker() {
  try {
    yield put(inputLock(true));
    yield put(controllerGoto('notGary'));

    const {
      web3: { claimObject, user, address },
      subscription: { web3Connected },
    } = (yield select()) as IState;
    if (!web3Connected) throw new TerminalError({ code: 'ACTION_ABORTED' });
    if (!address) throw new TerminalError({ code: 'UNEXPECTED_ERROR', details: 'No address' });
    const safeClaim: IClaimObject = claimObject || (yield makeClaim({}));

    yield put(print({ msg: messages.permissionCheckingStarted }));
    const safeUser: User = yield call(checkPermissions, address);
    yield put(print({ msg: messages.amountOfMineAccounts }));

    yield call(isClaimed, safeClaim, safeUser);
    if (!user) yield put(setUser(safeUser));

    yield put(controllerGoto('choice'));
    yield put(print({ msg: messages.claim }));

    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(loading(false));
    const { message, code }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
    yield put(inputLock(false));
    if (code === 'DENIED_BY_USER') yield put(controllerAddAction(OptionalActions.MINE));
  }
}

function* watchControllerJoinContinue() {
  yield takeEvery([ActionType.JOIN_CONTINUE], cancelOnDisconnectWeb3(controllerJoinContinueWorker));
}

function* controllerJoinAcceptedWorker() {
  try {
    yield put(inputLock(true));

    const {
      web3: { claimObject, user },
      subscription: { web3Connected },
    } = (yield select()) as IState;
    if (!claimObject || !user || !web3Connected) {
      throw new TerminalError({ code: 'METAMASK_RELOGIN' });
    }

    yield put(loading(true));
    const [transaction, hash]: [ethers.ContractTransaction, string] = yield claim(
      claimObject,
      user,
    );
    yield put(loading(false));
    yield put(print({ msg: messages.almostDone }));

    yield put(loading(true));
    yield call(waitTransactionEnd, transaction);
    yield put(loading(false));

    yield put(print({ msg: messages.yourHash(hash) }));
    yield delay(8000);
    yield put(playVideo(true));

    yield put(inputLock(false));
    yield put(controllerGotoRoot());
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(loading(false));
    const { message, code }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
    yield put(inputLock(false));
    if (code === 'DENIED_BY_USER') yield put(controllerAddAction(OptionalActions.MINE));
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
    yield put(loading(false));
    const { message, code }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
    yield put(inputLock(false));
    if (code === 'DENIED_BY_USER') yield put(controllerAddAction(OptionalActions.MINE));
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
