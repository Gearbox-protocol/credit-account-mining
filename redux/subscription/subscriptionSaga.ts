import {
  put, takeEvery, select, race, call, take,
} from 'redux-saga/effects';
import { store } from 'redux/store';
import { setAddress, setClaimObject, setUser } from 'redux/user/userAction';
import { controllerError } from 'redux/terminalController/terminalControllerActions';
import { print } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import errorStrings from 'utils/API/errors/TerminalError/error-strings';
import {
  changeStatus,
  setSubscription,
  unsubscribe,
  IActionChangeStatus,
} from './subscriptionActions';
import ActionType from './subscriptionActionTypes';

const handleChainChange = () => {
  store.dispatch(changeStatus('CHAIN_CHANGED'));
};

const handleDisconnect = () => {
  store.dispatch(changeStatus('DISCONNECTED'));
};

const handleAccountChange = () => {
  store.dispatch(changeStatus('ACCOUNT_CHANGED'));
};

function* subscribeWorker() {
  try {
    const {
      subscription: { isSubscribed },
    } = (yield select()) as IState;
    yield put(setSubscription(true));
    if (isSubscribed) return;

    window.ethereum!.on!('disconnect', handleDisconnect);
    window.ethereum!.on!('accountsChanged', handleAccountChange);
    window.ethereum!.on!('chainChanged', handleChainChange);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR, center: false }));
  }
}

function* watchSubscribe() {
  yield takeEvery(ActionType.SUBSCRIBE, subscribeWorker);
}

function* unsubscribeWorker() {
  try {
    yield put(setSubscription(false));
    window.ethereum!.removeListener!('connect', handleDisconnect);
    window.ethereum!.removeListener!('accountsChanged', handleAccountChange);
    window.ethereum!.removeListener!('chainChanged', handleChainChange);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR, center: false }));
  }
}

function* watchUnsubscribe() {
  yield takeEvery(ActionType.UNSUBSCRIBE, unsubscribeWorker);
}

function* changeStatusWorker({ payload }: IActionChangeStatus) {
  try {
    yield put(setClaimObject(null));
    yield put(setUser(null));
    yield put(setAddress(null));

    if (payload === 'DISCONNECTED') yield put(unsubscribe());
    yield put(controllerError({ msg: errorStrings[payload], center: false }));
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchChangeStatus() {
  yield takeEvery(ActionType.STATUS_CHANGED, changeStatusWorker);
}

function cancelOnStatusChange(generator: (...args: any[]) => void) {
  return function* cancellableGenerator(...args: any[]) {
    yield race({
      task: call(generator, ...args),
      cancel: take(ActionType.STATUS_CHANGED),
    });
  };
}

export {
  watchSubscribe, watchUnsubscribe, watchChangeStatus, cancelOnStatusChange,
};
