import axios from "axios";
import { ProfileType } from "../types/types"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c1409db0-4505-4183-a1c1-20fa7e76d266'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance
            .post(`follow/${userId}`, {})
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

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}


type AuthMeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}


export const authAPI = {
    authMe() {
        return instance
            .get<AuthMeResponseType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance
            .post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance
            .get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance
            .get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance
            .put(`profile/status`, { status: status })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance
            .put(`profile/photo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
    },
    updateProfile(profile: ProfileType) {
        return instance
            .put(`profile`, profile)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}






