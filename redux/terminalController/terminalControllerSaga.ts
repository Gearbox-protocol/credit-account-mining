import { put, takeEvery, select } from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
import { print } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import { IActionCommand } from './terminalControllerActions';
import { SystemActions } from './terminalControllerReducer';
import ActionType from './terminalControllerActionTypes';

function* controllerUserCommandWorker({ payload }: IActionCommand): Generator<any, void, any> {
  const {
    terminalController: { current },
  } = (yield select()) as IState;
  try {
    if (!current || !current.userActions) {
      throw new TerminalError({ code: 'COMMAND_NOT_FOUND' });
    }
    const hasDefaultAction = SystemActions.DEFAULT_ACTION in current.userActions;
    const isActionCorrect = payload in current.userActions;

    if (isActionCorrect) {
      const func = current.userActions[payload];
      yield put(func());
    } else if (hasDefaultAction) {
      const func = current.userActions[SystemActions.DEFAULT_ACTION];
      yield put(func());
    } else {
      throw new TerminalError({ code: 'COMMAND_NOT_FOUND' });
    }
  } catch (e: any) {
    yield put(print({ msg: e.message, center: false }));
  }
}

function* watchControllerUserCommand() {
  yield takeEvery(ActionType.COMMAND, controllerUserCommandWorker);
}

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

function* controllerLinksWorker(): Generator<any, void, any> {
  try {
    yield put(print({ msg: messages.links, center: false }));
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerLinks() {
  yield takeEvery(ActionType.LINKS, controllerLinksWorker);
}

export { watchControllerUserCommand, watchControllerHelp, watchControllerLinks };
