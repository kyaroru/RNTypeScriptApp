import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware, StoreEnhancer, AnyAction, Store} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers';
import sagas from 'sagas';

let middlewares: StoreEnhancer<any, unknown> | undefined;
let store: Store<any, AnyAction>;
const sagaMiddleware = createSagaMiddleware();

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['categories', 'cart'],
};

const reducer = persistCombineReducers(config, reducers);

/* global __DEV__ */
if (__DEV__) {
  const excludedActions: string | any[] = [];
  const logger = createLogger({
    collapsed: true,
    predicate: (_getState: any, action: { type: any; }) => excludedActions.indexOf(action.type) < 0,
  });
  middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware, logger));
} else {
  middlewares = applyMiddleware(sagaMiddleware);
}

export const getStore = () => store;

const configStore = (onComplete: (() => any) | undefined) => {
  store = createStore(reducer, middlewares);
  // configureInterceptor(); // uncomment when API is integrated
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store, null, onComplete);
  return {persistor, store};
};

export type RootState = ReturnType<typeof store.getState>;

export default configStore;
