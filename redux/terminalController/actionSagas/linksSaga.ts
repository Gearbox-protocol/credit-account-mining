import { put, takeEvery } from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { print } from 'redux/terminal/terminalAction';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerLinksWorker() {
  try {
    yield put(print({ msg: messages.links }));
  } catch (e: any) {
    yield put(print({ msg: e }));
  }
}

function* watchControllerLinks() {
  yield takeEvery(ActionType.LINKS, controllerLinksWorker);
}

export default watchControllerLinks;
