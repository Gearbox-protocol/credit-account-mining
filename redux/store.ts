import { createStore, applyMiddleware, Store } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReduxSagaMiddleware, { Task } from 'redux-saga';
import { isDev } from 'config/config';
import rootSaga from './root/rootSaga';
import rootReducer, { IState } from './root/rootReducer';

interface SagaStore extends Store {
  sagaTask?: Task;
}

const buildStore = () => {
  const sagaMiddleware = createReduxSagaMiddleware();
  const store: SagaStore = createStore(
    rootReducer,
    isDev ? composeWithDevTools(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware),
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const store = buildStore();

const makeStore: MakeStore<Store<IState>> = () => store;
const wrapper = createWrapper<Store<IState>>(makeStore);

export type { SagaStore };
export { wrapper, store };
