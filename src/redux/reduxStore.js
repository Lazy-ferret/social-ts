import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import authReducer from "./authReducer.ts";
import dialogsReducer from "./dialogsReducer.ts";
import profileReducer from "./profileReducer.ts";
import usersReducer from "./usersReducer.ts";
import thunkMiddleware from 'redux-thunk'
import appReducer from "./appReducer.ts";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

// const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store