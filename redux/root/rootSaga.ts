import {
  watchControllerUserCommand,
  watchControllerHelp,
  watchControllerLinks,
} from 'redux/terminalController/terminalControllerSaga';
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
    watchControllerUserCommand(),
    watchControllerHelp(),
    watchControllerLinks(),
    watchControllerJoin(),
    watchControllerJoinAccepted(),
    watchControllerJoinDenied(),
    watchControllerMined(),
    watchChangeStatus(),
    watchSubscribe(),
    watchUnsubscribe(),
  ]);
}
