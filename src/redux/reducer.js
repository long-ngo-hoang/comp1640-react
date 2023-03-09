import { combineReducers } from "@reduxjs/toolkit";
import ideasSlice from "./ideaSlice.js";
// import categoriesSlice from "./categoriesSlice.js";

export default rootReducer = combineReducers({
    ideas: ideasSlice,
    // categories: categoriesSlice
    
});
