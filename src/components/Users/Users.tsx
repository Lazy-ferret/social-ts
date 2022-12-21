import React from 'react'
// @ts-ignore
import Paginator from '../common/Paginator/Paginator.tsx'
import User from './User'
import { UserType } from './../../types/types'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number> 
    unfollow: () => void
    follow: () => void
}

const Users: React.FC<PropsType> = ({ totalUsersCount, pageSize, onPageChanged, currentPage, users, ...props }) => {

    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />
            <div>
                {
                    users.map(user => <User user={user}
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

