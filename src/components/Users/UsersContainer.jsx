import React from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, deleteUsers, setCurrentPage, toggleFollowingProgress, requestUsers } from '../../redux/usersReducer'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
// import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    componentWillUnmount() {
        this.props.deleteUsers()
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, { follow, unfollow, deleteUsers, setCurrentPage, toggleFollowingProgress, requestUsers }),
    // withAuthRedirect
)(UsersContainer)