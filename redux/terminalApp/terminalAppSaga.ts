import { put, takeEvery } from 'redux-saga/effects';
import errorStrings from 'utils/API/errors/TerminalError/error-strings';
import { print } from 'redux/terminal/terminalAction';
import { IActionSetVisited } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

function* setVisitedWorker({ payload }: IActionSetVisited): Generator<any, void, any> {
  try {
    yield localStorage.setItem('visited', String(payload));
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR, center: false }));
  }
}

function* watchSetVisited() {
  yield takeEvery(ActionType.SET_VISITED, setVisitedWorker);
}

export default watchSetVisited;
