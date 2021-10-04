import { put, takeEvery, select } from 'redux-saga/effects';
import messages from 'utils/API/messages/messages';
import { IState } from 'redux/root/rootReducer';
import { print } from 'redux/terminal/terminalAction';
import ActionType from '../terminalControllerActionTypes';

function* controllerHelpWorker(): Generator<any, void, any> {
  try {
    const {
      terminalController: { current },
    } = (yield select()) as IState;
    if (!current || !current.userActions) return;

    yield put(print({ msg: messages.helpText(Object.keys(current.userActions)), center: false }));
  } catch (e: any) {
    yield put(print({ msg: e, center: false }));
  }
}

function* watchControllerHelp() {
  yield takeEvery(ActionType.HELP, controllerHelpWorker);
}

export default watchControllerHelp;
