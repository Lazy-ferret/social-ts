import { usersAPI } from "../api/api"
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
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
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

export const followSuccess = (userId) => ({ type: FOLLOW, userId })

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const deleteUsers = () => ({ type: DELETE_USERS })

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const toggleFollowingProgress = (followingInProgress, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId })

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
    dispatch(setCurrentPage(page))
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
    const apiMethod = usersAPI.followUser.bind(usersAPI)
    const actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollow = (userId) => async (dispatch) => {
    const apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    const actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer
