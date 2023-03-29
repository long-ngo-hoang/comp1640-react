import { configureStore } from "@reduxjs/toolkit";
import ideasSlice from "./ideasSlice.js";
import categoriesSlice from "./categoriesSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import commentsSlice from "./commentsSlice.js";
import academicYearsSlice from "./academicYearsSlice.js";
import departmentsSlice from "./departmentsSlice.js";
import accountsSlice from "./accountsSlice.js";
import profilesSlice from "./profilesSlice.js";
import notificationSlice from "./notificationSlice.js";
import roleSlice from "./roleSlice.js";
import createFilter from 'redux-persist-transform-filter';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
  } from "redux-persist";
import filesSlice from "./filesSlice.js";


const saveSubsetFilter = createFilter('accounts', ['token']);

const persistCongig = {
    key: 'root',
    storage,
   blacklist: ['files'],
};

const reducer = combineReducers({
    ideas: ideasSlice,
    categories: categoriesSlice,
    comments : commentsSlice,
    academicYears: academicYearsSlice,
    departments: departmentsSlice,
    accounts: accountsSlice,
    notification: notificationSlice,
    roles : roleSlice,
    user: profilesSlice,
    files: filesSlice
});

const persistedReducer = persistReducer(persistCongig,reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export default store;