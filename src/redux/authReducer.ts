import { AppStateType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'
// @ts-ignore
import { authAPI, securityAPI, ResultCodesEnum, ResultCodeForCaptchaEnum } from "../api/api.ts"

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'
const SET_ERROR = 'social-network/auth/SET_ERROR'
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
    error: string | null
}

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    error: null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_ERROR:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

type ActionsTypes = SetErrorType | SetAuthUserDataType |
    GetCaptchaUrlSuccessType

type SetErrorPayloadType = {
    error: string
}

type SetErrorType = {
    type: typeof SET_ERROR
    payload: SetErrorPayloadType
}

export const setError = (error: string): SetErrorType => ({
    type: SET_ERROR, payload: { error }
})


type SetAuthUserDataPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error: string | null
}

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadType
}

export const setAuthUserData =
    (userId: number | null, email: string | null, login: string | null, isAuth: boolean, error: string | null): SetAuthUserDataType => ({
        type: SET_USER_DATA, payload: { userId, email, login, isAuth, error }
    })


type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.authMe()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data
        dispatch(setAuthUserData(id, email, login, true, null))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType =>
    async (dispatch) => {
        const loginData = await authAPI.login(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            const message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
            dispatch(setError(message))
        }
    }

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
