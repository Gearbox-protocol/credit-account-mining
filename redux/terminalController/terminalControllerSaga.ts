import { put, takeEvery, select } from 'redux-saga/effects';
import { messages, errors } from 'utils/text/terminalText';
import {
  checkMetamask,
  connectMetamask,
  checkNetwork,
  checkPermissions,
  isClaimed,
  claim,
  IAccount,
} from 'utils/API/join';
import { print, clear, inputLock, loading } from 'redux/terminal/terminalAction';
import { playVideo, setAccount } from 'redux/terminalApp/terminalAppAction';
import { IState } from 'redux/root/rootReducer';
import {
  IControllerCommand,
  controllerGotoRoot,
  controllerNext,
  controllerGotoJoin,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* controllerUserCommandWorker({ payload }: IControllerCommand): Generator<any, void, any> {
  const {
    terminalController: { current },
  } = (yield select()) as IState;
  try {
    if (!current || !current.userActions) throw new Error(payload);
    if (!current.userActions[payload]) throw new Error(payload);
    const func = current.userActions[payload];
    yield put(func());
  } catch (e: any) {
    if (e.message === payload) {
      yield put(print({ msg: errors.commandNotFound(payload), center: false }));
    } else {
      yield put(print({ msg: e.message, center: false }));
    }
  }
}

function* watchControllerUserCommandWorker() {
  yield takeEvery(ActionType.COMMAND, controllerUserCommandWorker);
}

function* controllerHelpWorker(): Generator<any, void, any> {
  try {
    yield put(print({ msg: messages.helpText, center: false }));
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerHelpWorker() {
  yield takeEvery(ActionType.HELP, controllerHelpWorker);
}

function* controllerClearWorker(): Generator<any, void, any> {
  try {
    yield put(clear());
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerClearWorker() {
  yield takeEvery(ActionType.C_CLEAR, controllerClearWorker);
}

function* controllerJoinWorker(): Generator<any, void, any> {
  try {
    yield put(inputLock(true));
    yield put(controllerGotoJoin());

    yield checkMetamask();

    yield put(loading(true));
    const user: string = yield connectMetamask();
    yield checkNetwork();
    yield put(loading(false));
    yield put(print({ msg: messages.metamaskConnected, center: false }));

    const accountsToMine: number = yield checkPermissions(user);
    yield put(print({ msg: messages.amountOfMineAccounts(accountsToMine), center: false }));

    const account: IAccount = yield isClaimed(user);
    yield put(setAccount(account));

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
    terminalApp: { account },
  } = (yield select()) as IState;
  try {
    if (!account) throw new Error(errors.metamaskLogin);
    yield claim(account);
    // loading !!!!!!!!!!!!!!!!!!!!!
    yield put(print({ msg: messages.congratulations, center: false }));
    yield put(controllerGotoRoot());
    // yield put(playVideo(true)); !!!!!!!!!!!!!!!!!!
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
  watchControllerUserCommandWorker,
  watchControllerHelpWorker,
  watchControllerClearWorker,
  watchControllerJoinWorker,
  watchControllerJoinAcceptedWorker,
  watchControllerJoinDeniedWorker,
};
