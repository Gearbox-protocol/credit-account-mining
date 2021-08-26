import {
  watchTerminalControllerCommand,
  watchTerminalControllerHelpWorker,
  watchTerminalControllerClearWorker,
} from 'redux/terminalController/terminalControllerSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    watchTerminalControllerCommand(),
    watchTerminalControllerHelpWorker(),
    watchTerminalControllerClearWorker(),
  ]);
}
