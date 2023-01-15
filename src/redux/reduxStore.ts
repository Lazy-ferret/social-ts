import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
// @ts-ignore
import authReducer from './authReducer.ts'
// @ts-ignore
import dialogsReducer from './dialogsReducer.ts'
// @ts-ignore
import profileReducer from './profileReducer.ts'
// @ts-ignore
import usersReducer from './usersReducer.ts'
import thunkMiddleware from 'redux-thunk'
// @ts-ignore
import appReducer from './appReducer.ts'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer 
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never

export type InferActionsTypes<T extends {[key: string] : (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>> 


// @ts-ignore 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store