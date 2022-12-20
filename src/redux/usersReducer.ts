import { usersAPI } from "../api/api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/helpers/object-helpers"

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
    followingInProgress: [] as Array<number> //array of users id
}

type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialState => {
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

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({
    type: FOLLOW, userId
})


type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
    type: UNFOLLOW, userId
})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS, users
})

type DeleteUsersActionType = {
    type: typeof DELETE_USERS
}

export const deleteUsers = (): DeleteUsersActionType => ({
    type: DELETE_USERS
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE, currentPage
})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT, totalUsersCount
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING, isFetching
})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    followingInProgress: boolean
    userId: number
}

export const toggleFollowingProgress = (followingInProgress: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId
})

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
    dispatch(setCurrentPage(page))
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: any) => {
    const apiMethod = usersAPI.followUser.bind(usersAPI)
    const actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollow = (userId: number) => async (dispatch: any) => {
    const apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    const actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer
