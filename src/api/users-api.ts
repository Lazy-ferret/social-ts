// @ts-ignore
import { instance, GetItemsType, APIResponseType } from './api.ts'
// @ts-ignore
import { profileAPI } from './profile-api.ts'

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance
            .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance
            .post<APIResponseType>(`follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance
            .delete(`follow/${userId}`) 
            .then(response => response.data) 
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId)
    }
}