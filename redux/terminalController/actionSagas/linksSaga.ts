import { put, call, takeEvery } from 'redux-saga/effects';
import { getTypedError, TerminalError } from 'utils/API/errors/error-hub';
import messages from 'utils/API/messages/messages';
import { print } from 'redux/terminal/terminalAction';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerLinksWorker() {
  try {
    yield put(print({ msg: messages.links }));
  } catch (e: any) {
    const { message }: TerminalError = yield call(getTypedError, e);
    yield put(print({ msg: message }));
  }
}

function* watchControllerLinks() {
  yield takeEvery(ActionType.LINKS, controllerLinksWorker);
}

export default watchControllerLinks;
