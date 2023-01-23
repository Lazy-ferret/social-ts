import { BaseThunkType, InferActionsTypes } from './reduxStore'
// @ts-ignore
import { authAPI } from '../api/auth-api.ts'
// @ts-ignore
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from '../api/api.ts'
// @ts-ignore
import { securityAPI } from '../api/security-api.ts'

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'
const SET_ERROR = 'social-network/auth/SET_ERROR'
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const initialState = {
    userId: null as (number | null),
    email: null as (string | null),
    login: null as (string | null),
    isAuth: false,
    captchaUrl: null as (string | null),
    error: null as (string | null)
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, error: string | null) => ({
        type: SET_USER_DATA, payload: { userId, email, login, isAuth, error }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
    } as const),
    setError: (error: string) => ({
        type: SET_ERROR, payload: { error }
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.authMe()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true, null))
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
            dispatch(actions.setError(message))
        }
    }

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false, null))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
