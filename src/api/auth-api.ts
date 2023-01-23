import { ResultCodesEnum, ResultCodeForCaptchaEnum } from './api';
// @ts-ignore
import { instance, APIResponseType } from './api.ts'

type MeResponsDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    authMe() {
        return instance
            .get<APIResponseType<MeResponsDataType>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance
            .post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    }
}