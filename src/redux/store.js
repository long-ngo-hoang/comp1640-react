import { configureStore } from "@reduxjs/toolkit";
import ideasSlice from "./ideasSlice.js";
import categoriesSlice from "./categoriesSlice.js";
import { persistStore, persistReducer } from "redux-persist";
// import {
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import commentsSlice from "./commentsSlice.js";
import academicYearsSlice from "./academicYearsSlice.js";
import departmentsSlice from "./departmentsSlice.js";
import loginSlice from "./loginSlice.js";
// import userSlice from "./usersSclice.js";
import usersSlice from "./usersSlice.js";

// import thunk from 'redux-thunk'
const persistCongig = {
    key: 'root',
    storage,
    // blacklist: ['ideas']
   
};

const reducer = combineReducers({
    ideas: ideasSlice,
    categories: categoriesSlice,
    comments : commentsSlice,
    academicYears: academicYearsSlice,
    departments: departmentsSlice,
    login: loginSlice,
    user: usersSlice,
});

const persistedReducer = persistReducer(persistCongig,reducer);

const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
    // middleware: [thunk, logger]
});

// const store = configureStore({
//     reducer: {
//     ideas: ideasSlice,
//     categories: categoriesSlice
//     }
// })

export const persistor = persistStore(store);
export default store;