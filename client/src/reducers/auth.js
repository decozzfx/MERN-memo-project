import { AUTH, LOGOUT } from '../constant/actionTypes'

const authReducer = (state = { authData : null }, action) => {
    // console.log(state)
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))  // sending data to local storage
            return { ...state, authData : action?.payload } // provide state to whole app
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData : null }
        default:
            return state
    }
}

export default authReducer