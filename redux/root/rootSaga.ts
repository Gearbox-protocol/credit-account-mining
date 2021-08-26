import {
  watchTerminalControllerUserCommandWorker,
  watchTerminalControllerHelpWorker,
  watchTerminalControllerClearWorker,
  watchTerminalControllerJoinWorker,
} from 'redux/terminalController/terminalControllerSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    watchTerminalControllerUserCommandWorker(),
    watchTerminalControllerHelpWorker(),
    watchTerminalControllerClearWorker(),
    watchTerminalControllerJoinWorker(),
  ]);
}
