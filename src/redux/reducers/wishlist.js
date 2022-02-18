import { GET_WISHLIST , CREATE_WISHLIST , DELETE_WISHLIST } from "../constans/wishlist"

const INITIAL_STATE = {
    wishlist: []
}

const wishlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WISHLIST:

            return {
                ...state,
                wishlist: action.payload
            }
         case CREATE_WISHLIST:
            return {
                wishlist: [...state.wishlist, action.payload]
            }
        case DELETE_WISHLIST:

            const newishlist = state.wishlist.filter(w => w._id !== action.payload.id)
            return {
                wishlist: [...newishlist]
            }

       
        default: return state
    }
}

export default wishlistReducer