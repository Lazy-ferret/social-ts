import { BaseThunkType, InferActionsTypes } from './reduxStore'
// @ts-ignore
import { profileAPI } from '../api/profile-api.ts'
// @ts-ignore
import { usersAPI } from '../api/users-api.ts'
import { PhotosType, PostsType, ProfileType } from '../types/types'

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
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    photos: [],
    error: null as string | null
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    addPostCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    deletePostCreator: (postId: number) => ({ type: DELETE_POST, postId } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const),
    setError: (error: string | null) => ({ type: SET_ERROR, error } as const)
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
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

export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        const data = await usersAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
        dispatch(actions.setError(null))
    }

export const getStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))
    }

export const updateStatus = (status: string): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    }

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const updateProfile = (profile: ProfileType): ThunkType => async (dispatch, getState: any) => {
    try {
        const userId = getState().auth.userId
        const data = await profileAPI.updateProfile(profile)
        if (data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        }
        if (data.resultCode !== 0) {
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(actions.setError(message))
            return Promise.reject(message)
        }
    } catch (error) {
        console.log(error.message)
    }
}

export default profileReducer
