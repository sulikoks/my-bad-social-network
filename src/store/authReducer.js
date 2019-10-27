//////////////////////////////////////////////////////////   DEPENDENCIES   ////////////////////////////////////////////

import {authAPI} from "../api/serverAPI"

//////////////////////////////////////////////////////////   NAME ACTION TYPES   ///////////////////////////////////////

const SET_AUTH_USER = 'SET_AUTH_USER'
const UNSET_AUTH_USER = 'UNSET_AUTH_USER'

//////////////////////////////////////////////////////////   INITIAL STATE   ///////////////////////////////////////////

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

//////////////////////////////////////////////////////////   REDUCERS   ////////////////////////////////////////////////

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case UNSET_AUTH_USER:
            return initialState
        default:
            return state
    }
}

//////////////////////////////////////////////////////////   ACTION CREATORS   /////////////////////////////////////////

export const setAuthUser = (data) => ({type: SET_AUTH_USER, data})
export const unsetAuthUser = () => ({type: UNSET_AUTH_USER})

//////////////////////////////////////////////////////////   THUNK CREATORS   //////////////////////////////////////////

export const setAuthUserAPI = (isAuth = false) => (dispatch) => {
    if (!isAuth)
        return authAPI.setAuthUser()
            .then(data => {
                if (data.resultCode === 0)
                    dispatch(setAuthUser(data.data))
            })
}
export const login = ({email, password, rememberMe}) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode ===0)
                dispatch(setAuthUserAPI())
            else console.log('Error login')
        })
}
export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode ===0)
                dispatch(unsetAuthUser())
            else console.log('Error logout')
        })
}