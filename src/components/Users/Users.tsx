import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: () => void
    currentPage: number
    user
    ...props
}

const Users: React.FC<PropsType> = ({ totalUsersCount, pageSize, onPageChanged, currentPage, user, ...props }) => {

    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />
            <div>
                {
                    props.users.map(user => <User user={user}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                        key={user.id} />)
                }
            </div>
        </div>
    )
}

export default Users

