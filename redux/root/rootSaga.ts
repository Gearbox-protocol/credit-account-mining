import {
  watchPrint, watchClear, watchLock, watchLoading,
} from 'redux/terminal/terminalSaga';
import {
  watchDisconnectWeb3,
  watchConnectWeb3,
  watchSubscribe,
  watchUnsubscribe,
} from 'redux/web3/web3Saga';
import {
  watchSetVisited,
  watchInitCounter,
  watchResetCounter,
} from 'redux/terminalApp/terminalAppSaga';
import watchControllerUserCommand from 'redux/terminalController/terminalControllerSaga';
import watchControllerHelp from 'redux/terminalController/actionSagas/helpSaga';
import watchControllerLinks from 'redux/terminalController/actionSagas/linksSaga';
import {
  watchControllerJoin,
  watchControllerJoinContinue,
  watchControllerIsGary,
  watchControllerJoinAccepted,
  watchControllerJoinDenied,
} from 'redux/terminalController/actionSagas/joinSaga';
import watchControllerMined from 'redux/terminalController/actionSagas/minedSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    watchSetVisited(),
    watchInitCounter(),
    watchResetCounter(),

    watchDisconnectWeb3(),
    watchConnectWeb3(),
    watchSubscribe(),
    watchUnsubscribe(),

    watchPrint(),
    watchClear(),
    watchLock(),
    watchLoading(),

    watchControllerUserCommand(),
    watchControllerHelp(),
    watchControllerLinks(),
    watchControllerJoin(),
    watchControllerIsGary(),
    watchControllerJoinContinue(),
    watchControllerJoinAccepted(),
    watchControllerJoinDenied(),
    watchControllerMined(),
  ]);
}
