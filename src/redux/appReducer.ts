import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
// @ts-ignore
import { getAuthUserData } from "./authReducer.ts"

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

type ThunkType = ThunkAction<void, AppStateType, unknown, InitializedSuccessActionType>

export const initializeApp = () : ThunkType  => (dispatch) => {
    const dispatchResult = dispatch(getAuthUserData())
    Promise.all([dispatchResult])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer
