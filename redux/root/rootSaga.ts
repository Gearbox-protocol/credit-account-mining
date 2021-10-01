import {
  watchControllerUserCommand,
  watchControllerHelp,
  watchControllerLinks,
} from 'redux/terminalController/terminalControllerSaga';

import {
  watchPrint, watchClear, watchLock, watchLoading,
} from 'redux/terminal/terminalSaga';

import {
  watchControllerJoin,
  watchControllerJoinAccepted,
  watchControllerJoinDenied,
} from 'redux/terminalController/terminalControllerJoinSaga';

import watchControllerMined from 'redux/terminalController/terminalControllerMinedSaga';

import {
  watchChangeStatus,
  watchSubscribe,
  watchUnsubscribe,
} from 'redux/subscriptionController/subscriptionControllerSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    watchChangeStatus(),
    watchSubscribe(),
    watchUnsubscribe(),
    watchPrint(),
    watchClear,
    watchLock,
    watchLoading,
    watchControllerUserCommand(),
    watchControllerHelp(),
    watchControllerLinks(),
    watchControllerJoin(),
    watchControllerJoinAccepted(),
    watchControllerJoinDenied(),
    watchControllerMined(),
  ]);
}
