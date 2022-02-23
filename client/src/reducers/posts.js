import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE, FETCH_BY_SEARCH } from "../constant/actionTypes"
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts : action.payload.data,
                currentPage : action.payload.currentPage,
                numberOfPage : action.payload.numberOfPage

            }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }
        case CREATE:
            return [ ...state, action.payload]
        case UPDATE :
        case LIKE :
            return state.map((post) => post.id === action.payload._id ? action.payload : post)
        case DELETE :
            return state.filter((post) => post._id !== action.payload )
        default:
            return state
    }
}