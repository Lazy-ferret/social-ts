import { APIResponseType } from './../api/api';
import { BaseThunkType, InferActionsTypes } from './reduxStore'
// @ts-ignore
import { usersAPI } from '../api/users-api.ts'
import { UserType } from '../types/types'
// @ts-ignore
import { updateObjectInArray } from '../utils/helpers/object-helpers.ts'
import { Dispatch } from 'redux'

const FOLLOW = 'social-network/users/FOLLOW'
const UNFOLLOW = 'social-network/users/UNFOLLOW'
const SET_USERS = 'social-network/users/SET_USERS'
const DELETE_USERS = 'social-network/users/DELETE_USERS'
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE'
const SET_FILTER = 'social-network/users/SET_FILTER'
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '', 
        friend: null as null | boolean
    }
}

export type InitialState = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export type FilterType = typeof initialState.filter

export const actions = {
    followSuccess: (userId: number) => ({ type: FOLLOW, userId }) as const,
    unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId }) as const,
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users }) as const,
    deleteUsers: () => ({ type: DELETE_USERS }) as const,
    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage }) as const,
    setFilter: (filter: FilterType) => ({ type: SET_FILTER, payload: filter }) as const,
    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount }) as const,
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching }) as const,
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId }) as const
}

const usersReducer = (state = initialState, action: ActionsType): InitialState => {
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
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
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

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))
        
        const response = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(response.items))
        dispatch(actions.setTotalUsersCount(response.totalCount))
        
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsType) => {
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
    await followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    const apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    const actionCreator = actions.unfollowSuccess
    await followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer
