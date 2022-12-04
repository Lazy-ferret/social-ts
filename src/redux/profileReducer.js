import { profileAPI, usersAPI } from "../api/api"

const ADD_POST = 'social-network/profile/ADD-POST'
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE'
const SET_STATUS = 'social-network/profile/SET_STATUS'
const DELETE_POST = 'social-network/profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS'
const SET_ERROR = 'social-network/profile/SET_ERROR'

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 5 },
        { id: 2, message: "It's my first post", likesCount: 15 },
    ],
    profile: null,
    status: '',
    photos: [],
    error: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: { ...state.profile, photos: action.photos }
            }
        }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export const addPostCreator = (newPostText) => ({ type: ADD_POST, newPostText })

export const deletePostCreator = (postId) => ({ type: DELETE_POST, postId })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response))
    dispatch(setError(null))
}

export const setStatus = (status) => ({ type: SET_STATUS, status })

export const setError = (error) => ({ type: SET_ERROR, error })

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const updateProfile = (profile) => async (dispatch, getState) => {
    try {
        const userId = getState().auth.userId
        const response = await profileAPI.updateProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        }
        if (response.data.resultCode !== 0) {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(setError(message))
            return Promise.reject(message)
        }
    } catch (error) {
        console.log(error.message)
    }
}

export default profileReducer
