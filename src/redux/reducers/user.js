// import { LOGIN , SIGNUP , FORGOT , PROFILE , ADDRESS} from "../constans/user"

const INITIAL_STATE = {
    user: ""
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case GET_ORDERS:


        //     return {
        //         ...state,
        //         orders: action.payload
        //     }
        // case SET_ORDERS:
        //     return {
        //         orders: [...state.orders, action.payload]
        //     }
        // case DELETE_ORDERS:
        //     const newOrder = state.orders.filter(o => o._id !== action.payload.id)
        //     return {
        //         orders: [...newOrder]
        //     }
        // case INCREASE_ORDERS:
        //     const indexI = state.orders.findIndex(o => o._id == action.payload.id);
        //     state.orders[indexI]["quantity"] += 1

        //     return {
        //         orders: [...state.orders]
        //     }
        // case DECREASE_ORDERS:
        //     const indexD = state.orders.findIndex(o => o._id == action.payload.id);
        //     state.orders[indexD]["quantity"] -= 1

        //     return {
        //         orders: [...state.orders]
        //     }
        default: return state
    }
}

export default ordersReducer