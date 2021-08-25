import { createStore, applyMiddleware, Store } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReduxSagaMiddleware, { Task } from 'redux-saga';
import rootSaga from './root/rootSaga/rootSaga';
import rootReducer, { IState } from './root/rootReducer/rootReducer';

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';

interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore: MakeStore<Store<IState>> = () => {
  const sagaMiddleware = createReduxSagaMiddleware();
  const store: SagaStore = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
const wrapper = createWrapper<Store<IState>>(makeStore, { debug: isDev });

export type { SagaStore };

export default wrapper;
