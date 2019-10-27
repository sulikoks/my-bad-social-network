import {setAuthUserAPI} from "./authReducer";

const INIT_SUCCESS = 'INIT_SUCCESS'

const initState = {
    isInit: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case INIT_SUCCESS:
            return {
                ...state,
                isInit: true
            }
        default:
            return state
    }
}

export const initSuccess = () => ({type: INIT_SUCCESS})

export const initApp = () => (dispatch) => {
    let promise = dispatch(setAuthUserAPI())

    ////dispatch
    Promise.all([promise])
        .then(() => dispatch(initSuccess()))
}