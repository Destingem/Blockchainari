
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import modals from "./modals";
// initial states here
const initalState = {};

const rootReducer = combineReducers({auth, modals})
// middleware
const middleware = [thunk];
// creating store
export const store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

// assigning store to next wrapper
const makeStore = () => store;
export const wrapper = createWrapper(makeStore);