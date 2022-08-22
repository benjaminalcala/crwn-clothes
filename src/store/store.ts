import {createStore, compose, applyMiddleware, Middleware} from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}


const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare
].filter((middleware): middleware is Middleware  => Boolean(middleware));

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined,  composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
