import { put, takeEvery } from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { print } from 'redux/terminal/terminalAction';
import ActionType from '../terminalControllerActionTypes';

function* controllerHelpWorker(): Generator<any, void, any> {
  try {
    yield put(print({ msg: messages.helpText, center: false }));
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerHelp() {
  yield takeEvery(ActionType.HELP, controllerHelpWorker);
}

export default watchControllerHelp;
