import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './AuthSlice';
import { api } from './apis/api';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['api'], // Optional: prevent API cache from persisting
};

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer, // Add the API reducer here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware), // Add the API middleware here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
