import { applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
    userReducer
});
const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});
export default store;