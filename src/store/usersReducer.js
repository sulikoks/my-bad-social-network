//////////////////////////////////////////////////////////   DEPENDENCIES   ////////////////////////////////////////////

import {userAPI} from "../api/serverAPI";

//////////////////////////////////////////////////////////   NAME ACTION TYPES   ///////////////////////////////////////

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const SET_USERS_CURRENT_PAGE = 'SET_USERS_CURRENT_PAGE';
const SET_IS_USERS_LOAD = 'SET_IS_USERS_LOAD';
const SET_IS_BUTTONS_DISABLED = 'SET_IS_BUTTONS_DISABLED';

//////////////////////////////////////////////////////////   INITIAL STATE   ///////////////////////////////////////////

let initialState = {
    users: [],
    usersTotalCount: 0,
    usersPageSize: 5,
    usersCurrentPage: 1,
    isUsersLoad: false,
    isButtonsDisabled: []
}

//////////////////////////////////////////////////////////   REDUCERS   ////////////////////////////////////////////////

export default (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.UID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.UID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                usersTotalCount: action.totalCount
            }
        case SET_USERS_CURRENT_PAGE:
            return {
                ...state,
                usersCurrentPage: action.pageNumber
            }
        case SET_IS_USERS_LOAD:
            return {
                ...state,
                isUsersLoad: action.isLoad
            }
        case SET_IS_BUTTONS_DISABLED:
            return {
                ...state,
                isButtonsDisabled: action.on
                    ? [...state.isButtonsDisabled, action.UID]
                    : [...state.isButtonsDisabled.filter(UID => UID !== action.UID)]
            }
        default:
            return state;
    }
};

//////////////////////////////////////////////////////////   ACTION CREATORS   /////////////////////////////////////////

export const onFollow = (UID) => ({type: FOLLOW, UID})
export const onUnfollow = (UID) => ({type: UNFOLLOW, UID})
export const onSetUsers = (users) => ({type: SET_USERS, users})
export const onSetUsersTotalCount = (totalCount) => ({type: SET_USERS_TOTAL_COUNT, totalCount})
export const onSetUsersCurrentPage = (pageNumber) => ({type: SET_USERS_CURRENT_PAGE, pageNumber})
export const onIsUsersLoad = (isLoad) => ({type: SET_IS_USERS_LOAD, isLoad})
export const setIsButtonsDisabled = (UID, on) => ({type: SET_IS_BUTTONS_DISABLED, UID, on})

//////////////////////////////////////////////////////////   THUNK CREATORS   //////////////////////////////////////////

export const setUsers = (pageSize, currentPage) => (dispatch) => {
    dispatch(onIsUsersLoad(true))
    dispatch(onSetUsersCurrentPage(currentPage))
    userAPI.setUsers(pageSize, currentPage)
        .then(data => {
            dispatch(onIsUsersLoad(false))
            dispatch(onSetUsersTotalCount(data.totalCount))
            dispatch(onSetUsers(data.items))
        })
}
export const unFollow = (id) => (dispatch) => {
    dispatch(setIsButtonsDisabled(id, true))
    userAPI.unFollow(id).then(data => {
        dispatch(setIsButtonsDisabled(id, false))
        if (data.resultCode === 0)
            dispatch(onUnfollow(id))
    })
}
export const follow = (id) => (dispatch) => {
    dispatch(setIsButtonsDisabled(id, true))
    userAPI.follow(id).then(data => {
        dispatch(setIsButtonsDisabled(id, false))
        if (data.resultCode === 0)
            dispatch(onFollow(id))
    })
}