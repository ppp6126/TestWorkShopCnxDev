import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../Slice/counterSlice';
import favoritesReducer from '../Slice/favoritesSlice';
import modeSlice from '../Slice/modeSlice';
import storage from 'redux-persist/lib/storage';
import checkLoginSlice from '../Slice/checkLoginSlice';
import {
    persistReducer,
  } from "redux-persist";
  import { combineReducers } from "redux";

const reducers = combineReducers({
        counter : counterReducer ,
        favorites : favoritesReducer,
        mode : modeSlice ,
        ckLogin : checkLoginSlice,
  });
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  export const persistedReducer = persistReducer(persistConfig, reducers);

  export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const persistor = persistStore(store);
// export default store;