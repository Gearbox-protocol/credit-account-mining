import { put, takeEvery } from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { print } from 'redux/terminal/terminalAction';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerLinksWorker(): Generator<any, void, any> {
  try {
    yield put(print({ msg: messages.links, center: false }));
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerLinks() {
  yield takeEvery(ActionType.LINKS, controllerLinksWorker);
}

export default watchControllerLinks;
