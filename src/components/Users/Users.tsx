import React from 'react'
// @ts-ignore
import Paginator from '../common/Paginator/Paginator.tsx'
// @ts-ignore
import User from './User.tsx'
import { UserType } from './../../types/types'
// @ts-ignore
import UsersSearchForm from './UsersSearchForm.tsx'
import { FilterType } from '../../redux/usersReducer'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: () => void
    follow: () => void
}

const Users: React.FC<PropsType> = ({ totalUsersCount, pageSize, onPageChanged, onFilterChanged, currentPage, users, ...props }) => {

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
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

