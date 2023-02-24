import { configureStore } from "@reduxjs/toolkit";
import ideasSlice from "./ideasSlice.js";
import categoriesSlice from "./categoriesSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistCongig = {
    key: 'root',
    storage,
   
};

const reducer = combineReducers({
    ideas: ideasSlice,
    categories: categoriesSlice
});

const persistedReducer = persistReducer(persistCongig,reducer);

const store = configureStore({
    reducer: persistedReducer
});

// const store = configureStore({
//     reducer: {
//     ideas: ideasSlice,
//     categories: categoriesSlice
//     }
// })

export const persistor = persistStore(store);
export default store;