import { put, takeEvery, call } from 'redux-saga/effects';
import { errorStrings } from 'utils/API/errors/error-hub';
import { print } from 'redux/terminal/terminalAction';
import { setVisited } from 'utils/API/visited/visited';
import { IActionSetVisited } from './terminalAppAction';
import ActionType from './terminalAppActionTypes';

function* setVisitedWorker({ payload }: IActionSetVisited) {
  try {
    yield call(setVisited, payload);
  } catch (e: any) {
    yield put(print({ msg: errorStrings.UNEXPECTED_ERROR }));
  }
}

function* watchSetVisited() {
  yield takeEvery(ActionType.SET_VISITED, setVisitedWorker);
}

export { watchSetVisited };
