import { put, takeEvery } from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { print } from 'redux/terminal/terminalAction';
import { ActionType } from '../terminalControllerActionTypes';

function* controllerHelpWorker() {
  try {
    yield put(print({ msg: messages.helpText }));
  } catch (e: any) {
    yield put(print({ msg: e }));
  }
}

function* watchControllerHelp() {
  yield takeEvery(ActionType.HELP, controllerHelpWorker);
}

export default watchControllerHelp;
