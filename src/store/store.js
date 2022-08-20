import {createStore, compose, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined,  composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
