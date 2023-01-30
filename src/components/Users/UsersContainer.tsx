import React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import { follow, unfollow, requestUsers, actions } from '../../redux/usersReducer.ts'
// @ts-ignore
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersFilter } from '../../redux/users-selectors.ts'
// @ts-ignore
import Users from './Users.tsx'
// @ts-ignore
import Preloader from '../common/Preloader/Preloader.tsx'
import { compose } from 'redux'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/reduxStore'
import { ComponentType } from 'react'
import { FilterType } from '../../redux/usersReducer'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    deleteUsers: () => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    componentWillUnmount() {
        this.props.deleteUsers()
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize, filter } = this.props
        this.props.requestUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const { pageSize } = this.props
        this.props.requestUsers(1, pageSize, filter)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose<ComponentType>(
    connect<MapStatePropsType,
        MapDispatchPropsType,
        OwnPropsType,
        AppStateType>(mapStateToProps, { follow, unfollow, deleteUsers: actions.deleteUsers, requestUsers }),
)(UsersContainer)
