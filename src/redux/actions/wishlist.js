
import { GET_WISHLIST , CREATE_WISHLIST , DELETE_WISHLIST } from "../constans/wishlist"
import { SHOW_ERROR_MESSAGE } from "../constans/message"
import { List , Create , Delete} from "../../services/wishlist"
import { START_LOADING, STOP_LOADING } from "../constans/loading"

const get_wishlist = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_WISHLIST,
                payload:  data.msg
            })
        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const create_wishlist = (productId , userId , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })
    Create({productId , userId} , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: CREATE_WISHLIST,
                payload: data.msg

            })
        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
       //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}



const delete_wishlist = (id , authorization ) => async dispatch => {
    dispatch({ type: START_LOADING })

    Delete(id , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: DELETE_WISHLIST,
                payload: {id}

            })
        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


export {
    get_wishlist , create_wishlist , delete_wishlist
}

