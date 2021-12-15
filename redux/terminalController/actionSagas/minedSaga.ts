import {
  put, call, takeEvery, select,
} from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { getTypedError, TerminalError } from 'utils/API/errors/error-hub';
import makeClaim, { IClaimObject } from 'utils/API/web3/make-claim';
import countClaims from 'utils/API/mined/mined';
import { print, inputLock, loading } from 'redux/terminal/terminalAction';
import { cancelOnDisconnectWeb3 } from 'redux/web3/web3Saga';
import { IState } from 'redux/root/rootReducer';
import { controllerGotoRoot } from '../actions/terminalControllerActions';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerMinedWorker() {
  try {
    const {
      web3: { claimObject },
    } = (yield select()) as IState;
    const safeClaim: IClaimObject = claimObject || (yield makeClaim({}));

    yield put(inputLock(true));
    yield put(loading(true));

    const amount: number = yield call(countClaims, safeClaim);

    yield put(loading(false));
    yield put(print({ msg: messages.accountsMined(amount) }));
    yield put(inputLock(false));
  } catch (e: any) {
    yield put(controllerGotoRoot());
    yield put(loading(false));
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
    yield put(inputLock(false));
  }
}

function* watchControllerMined() {
  yield takeEvery(ActionType.MINED, cancelOnDisconnectWeb3(controllerMinedWorker));
}

export default watchControllerMined;
