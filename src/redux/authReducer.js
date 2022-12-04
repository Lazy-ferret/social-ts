import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'
const SET_ERROR = 'social-network/auth/SET_ERROR'
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    error: null
}

const authReducer = (state = initialState, action) => {
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

export const setError = (error) => ({ type: SET_ERROR, payload: { error } })

export const setAuthUserData = (userId, email, login, isAuth, error) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth, error } })

export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.authMe()
    if (response.resultCode === 0) {
        let { id, email, login } = response.data
        dispatch(setAuthUserData(id, email, login, true, null))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(setError(message))
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null, null))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
