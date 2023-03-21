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
// import userSlice from "./usersSclice.js";
import usersSlice from "./usersSlice.js";
import notificationSlice from "./notificationSlice.js";
import roleSlice from "./roleSlice.js";

const persistCongig = {
    key: 'root',
    storage,
   blacklist: ['comments']
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
    user: usersSlice,
});

const persistedReducer = persistReducer(persistCongig,reducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;