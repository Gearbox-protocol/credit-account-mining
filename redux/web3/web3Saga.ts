import {
  put, takeEvery, select, race, call, take,
} from 'redux-saga/effects';
import { store } from 'redux/store';
import { setClaimObject, setAddress, setUser } from 'redux/web3/web3Action';
import { controllerGotoRoot } from 'redux/terminalController/actions/terminalControllerActions';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import { getTypedError, errorStrings, TerminalError } from 'utils/API/errors/error-hub';
import makeClaim, { IClaimObject } from 'utils/API/web3/make-claim';
import { network } from 'config/config';
import {
  setConnection,
  connectWeb3,
  disconnectedWeb3,
  setSubscription,
  IActionWeb3Disconnected,
} from './web3Action';
import ActionType from './web3ActionTypes';

const handleChainChange = (hexChainID: string) => {
  const decimalChainID = Number(hexChainID).toString();
  if (decimalChainID === network) {
    store.dispatch(connectWeb3());
  } else {
    store.dispatch(disconnectedWeb3('CHAIN_CHANGED'));
  }
};

const handleConnect = () => {
  store.dispatch(connectWeb3());
};

const handleDisconnect = () => {
  store.dispatch(disconnectedWeb3('DISCONNECTED'));
};

const handleAccountChange = () => {
  store.dispatch(disconnectedWeb3('ACCOUNT_CHANGED'));
};

function* subscribeWorker() {
  try {
    const {
      web3: { metamaskSubscribed },
    } = (yield select()) as IState;
    if (!metamaskSubscribed) {
      yield put(setSubscription(true));
      window.ethereum!.on!('connect', handleConnect);
      window.ethereum!.on!('disconnect', handleDisconnect);
      window.ethereum!.on!('accountsChanged', handleAccountChange);
      window.ethereum!.on!('chainChanged', handleChainChange);
    }
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchSubscribe() {
  yield takeEvery(ActionType.SUBSCRIBE, subscribeWorker);
}

function* unsubscribeWorker() {
  try {
    yield put(setSubscription(false));
    window.ethereum!.removeListener!('connect', handleConnect);
    window.ethereum!.removeListener!('disconnect', handleDisconnect);
    window.ethereum!.removeListener!('accountsChanged', handleAccountChange);
    window.ethereum!.removeListener!('chainChanged', handleChainChange);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchUnsubscribe() {
  yield takeEvery(ActionType.UNSUBSCRIBE, unsubscribeWorker);
}

function* web3ShallowDisconnect({ payload }: IActionWeb3Disconnected) {
  try {
    const {
      web3: { address },
    } = (yield select()) as IState;

    const newlyConnected = !address;
    if (!newlyConnected) {
      yield put(setUser(null));
      yield put(setAddress(null));
      yield put(controllerGotoRoot());
      yield put(loading(false));
      yield put(print({ msg: errorStrings[payload] }));
      yield put(inputLock(false));
    }
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* web3DeepDisconnect({ payload }: IActionWeb3Disconnected) {
  try {
    const {
      web3: { claimObject, web3Connected },
    } = (yield select()) as IState;

    if (web3Connected && claimObject) {
      yield put(setConnection(false));

      yield put(setClaimObject(null));
      yield put(setUser(null));
      yield put(setAddress(null));

      yield put(controllerGotoRoot());
      yield put(loading(false));
      yield put(print({ msg: errorStrings[payload] }));
      yield put(inputLock(false));
    }
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* disconnectWeb3Worker(props: IActionWeb3Disconnected) {
  try {
    if (props.payload === 'ACCOUNT_CHANGED') {
      yield call(web3ShallowDisconnect, props);
    } else {
      yield call(web3DeepDisconnect, props);
    }
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* watchDisconnectWeb3() {
  yield takeEvery(ActionType.DISCONNECTED_WEB3, disconnectWeb3Worker);
}

function cancelOnDisconnectWeb3(generator: (...args: any[]) => void) {
  return function* cancellableGenerator(...args: any[]) {
    yield race({
      task: call(generator, ...args),
      cancel: take(ActionType.DISCONNECTED_WEB3),
    });
  };
}

function* connectWeb3Worker() {
  try {
    const {
      web3: { claimObject },
    } = (yield select()) as IState;

    const safeClaim: IClaimObject = yield call(makeClaim, claimObject || {});
    yield put(setClaimObject(safeClaim));

    yield put(setConnection(true));

    yield put(controllerGotoRoot());
    yield put(loading(false));
    yield put(inputLock(false));
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    console.warn(message);
  }
}

function* watchConnectWeb3() {
  yield takeEvery(ActionType.CONNECT_WEB3, connectWeb3Worker);
}

export {
  watchSubscribe,
  watchUnsubscribe,
  watchDisconnectWeb3,
  watchConnectWeb3,
  cancelOnDisconnectWeb3,
};
