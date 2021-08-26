import watchTerminalControllerCommand from 'redux/terminalController/terminalControllerSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([watchTerminalControllerCommand()]);
}
