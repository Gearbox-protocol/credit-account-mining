import { put, takeEvery, select, delay } from 'redux-saga/effects';
import { messages, errors } from 'utils/text/terminalText';
import { connectMetamask, checkPermissions, isClaimed, claim, IClaimObject } from 'utils/API/join';
import { IAccount } from 'utils/allowedUsers/allowedUsers';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { playVideo, setAccount } from 'redux/terminalApp/terminalAppAction';
import { IState } from 'redux/root/rootReducer';
import {
  controllerGotoRoot,
  controllerNext,
  controllerGotoJoin,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* controllerJoinWorker(): Generator<any, void, any> {
  try {
    yield put(inputLock(true));
    yield put(controllerGotoJoin());

    yield put(loading(true));
    const metamaskAccounts: string[] = yield connectMetamask();
    yield put(loading(false));
    yield put(print({ msg: messages.metamaskConnected, center: false }));

    const [account, accountsToMine]: [IAccount, number] = yield checkPermissions(
      metamaskAccounts[0],
    );
    yield put(print({ msg: messages.amountOfMineAccounts(accountsToMine), center: false }));

    const claimObject: IClaimObject = yield isClaimed(metamaskAccounts[0], account);
    yield put(setAccount(claimObject));

    yield put(controllerNext());
    yield put(inputLock(false));
    yield put(print({ msg: messages.claim, center: false }));
  } catch (e: any) {
    yield put(loading(false));
    yield put(controllerGotoRoot());

    yield put(print({ msg: e.message, center: false }));
    yield put(inputLock(false));
  }
}

function* watchControllerJoinWorker() {
  yield takeEvery(ActionType.JOIN, controllerJoinWorker);
}

function* controllerJoinAcceptedWorker(): Generator<any, void, any> {
  const {
    terminalApp: { claimObject },
  } = (yield select()) as IState;
  try {
    if (!claimObject) throw new Error(errors.metamaskLogin);
    yield put(inputLock(true));

    yield claim(claimObject);
    yield put(loading(true));
    yield put(loading(false));

    yield put(print({ msg: messages.congratulations, center: false }));

    yield delay(1000);
    yield put(playVideo(true));

    yield put(inputLock(false));
    yield put(controllerGotoRoot());
  } catch (e: any) {
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
  try {
    yield put(controllerGotoRoot());
    yield put(print({ msg: errors.denied, center: false }));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(print({ msg: e.message, center: false }));
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
