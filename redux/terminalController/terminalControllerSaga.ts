import { put, takeEvery } from 'redux-saga/effects';
import { print } from 'redux/terminal/terminalAction';
import {
  ITerminalControllerCommand,
  terminalControllerGotoRoot,
} from './terminalControllerActions';
import ActionType from './terminalControllerActionTypes';

function* terminalControllerCommandWorker({
  payload,
}: ITerminalControllerCommand): Generator<any, void, any> {
  console.log(payload);
  try {
    console.log(payload);
  } catch (e) {
    yield put(terminalControllerGotoRoot());
    yield put(print({ msg: 'error', center: false }));
  }
}

function* watchTerminalControllerCommand() {
  yield takeEvery(ActionType.COMMAND, terminalControllerCommandWorker);
}

export default watchTerminalControllerCommand;
