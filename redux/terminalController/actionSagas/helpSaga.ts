import { put, call, takeEvery } from 'redux-saga/effects';
import { getTypedError, TerminalError } from 'utils/API/errors/error-hub';
import messages from 'utils/API/messages/messages';
import { print } from 'redux/terminal/terminalAction';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerHelpWorker() {
  try {
    yield put(print({ msg: messages.helpText }));
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* watchControllerHelp() {
  yield takeEvery(ActionType.HELP, controllerHelpWorker);
}

export default watchControllerHelp;
