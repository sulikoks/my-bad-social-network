import * as axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'b0d78ab1-3ab7-498e-9ca9-c3403889e0bf'
    }
})

export const authAPI = {
    setAuthUser: () => instance.get('auth/me').then(response => response.data),
    login: (email, password, rememberMe = false) => instance.post('auth/login', {email, password, rememberMe}).then(response => response.data),
    logout: () => instance.post('auth/logout').then(response => response.data),
}
export const profileAPI = {
    setUserProfile: (UID) => instance.get(`profile/${UID}`).then(response => response.data),
    getStatus: (UID) => instance.get(`profile/status/${UID}`).then(response => response.data),
    putStatus: (status) => instance.put(`profile/status/`, {status}).then(response => response.data),
}
export const userAPI = {
    setUsers: (pageSize, page) => instance.get(`users?count=${pageSize}&page=${page}`).then(response => response.data),
    unFollow: id => instance.delete(`follow/${id}`).then(response => response.data),
    follow: id => instance.post(`follow/${id}`).then(response => response.data)
}
