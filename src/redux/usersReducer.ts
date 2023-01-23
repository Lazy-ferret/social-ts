import { AppStateType, InferActionsTypes } from './reduxStore'
// @ts-ignore
import { usersAPI } from '../api/users-api.ts'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/helpers/object-helpers'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

const FOLLOW = 'social-network/users/FOLLOW'
const UNFOLLOW = 'social-network/users/UNFOLLOW'
const SET_USERS = 'social-network/users/SET_USERS'
const DELETE_USERS = 'social-network/users/DELETE_USERS'
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case DELETE_USERS:
            return {
                ...state, users: []
            }
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: FOLLOW, userId }) as const,
    unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId }) as const,
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users }) as const,
    deleteUsers: () => ({ type: DELETE_USERS }) as const,
    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage }) as const,
    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount }) as const,
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching }) as const,
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId }) as const
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        const response = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(response.items))
        dispatch(actions.setTotalUsersCount(response.totalCount))
        dispatch(actions.setCurrentPage(page))
    }
}

const followUnfollowFlow = async (dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    const apiMethod = usersAPI.followUser.bind(usersAPI)
    const actionCreator = actions.followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    const apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    const actionCreator = actions.unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer
