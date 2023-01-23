import { AppStateType, InferActionsTypes } from './reduxStore'
import { ThunkAction } from 'redux-thunk'
// @ts-ignore
import { getAuthUserData } from './authReducer.ts'

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS'

export type InitialStateType = typeof initialState 

type ActionsType = InferActionsTypes<typeof actions>

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

export const actions = {
    initializedSuccess: ()=> ({ type: INITIALIZED_SUCCESS })
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const initializeApp = () : ThunkType  => (dispatch) => {
    const dispatchResult = dispatch(getAuthUserData())
    Promise.all([dispatchResult])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

export default appReducer
