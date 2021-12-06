import { put, takeEvery, call } from 'redux-saga/effects';
import errorStrings from 'utils/API/errors/TerminalError/error-strings';
import { print } from 'redux/terminal/terminalAction';
import { IActionSetVisited } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

function* setVisitedWorker({ payload }: IActionSetVisited) {
  try {
    yield call(localStorage.setItem, 'visited', String(payload));
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchSetVisited() {
  yield takeEvery(ActionType.SET_VISITED, setVisitedWorker);
}

export default watchSetVisited;
