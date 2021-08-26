import {
  watchControllerUserCommandWorker,
  watchControllerHelpWorker,
  watchControllerClearWorker,
  watchControllerJoinWorker,
} from 'redux/terminalController/terminalControllerSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    watchControllerUserCommandWorker(),
    watchControllerHelpWorker(),
    watchControllerClearWorker(),
    watchControllerJoinWorker(),
  ]);
}
