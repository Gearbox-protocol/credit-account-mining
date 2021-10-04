import { put, takeEvery, select } from 'redux-saga/effects';
import { TerminalError } from 'utils/API/errors/TerminalError/TerminalError';
import { print } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer';
import { IActionCommand } from './terminalControllerActions';
import { SystemActions } from './terminalControllerReducer';
import { ActionType } from './terminalControllerActionTypes';

function* controllerUserCommandWorker({ payload }: IActionCommand): Generator<any, void, any> {
  try {
    const {
      terminalController: { current },
    } = (yield select()) as IState;
    if (!current || !current.userActions) {
      throw new TerminalError({ code: 'COMMAND_NOT_FOUND' });
    }

    const isMainAction = payload in current.userActions;
    const hasDefaultAction = SystemActions.DEFAULT_ACTION in current.userActions;

    if (isMainAction) {
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

export default watchControllerUserCommand;
