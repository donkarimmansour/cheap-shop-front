
import { LOGIN , SIGNUP , FORGOT , PROFILE , ADDRESS , CONFIRM} from "../constans/user"
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE, CLEAR_MESSAGE } from "../constans/message"
import { ConfirmEmailAuth, ForgotAuth, LoginAuth, SignupAuth} from "../../services/auth"
import { START_LOADING, STOP_LOADING } from "../constans/loading"
import { setAuthentication } from "../../shared/auth"
import { AddressAccount, EditAccount , Image } from "../../services/user"
import { setLocalStorage , getLocalStorage } from "../../shared/localStorage"

const SignupAuths = (values) => async dispatch => {
    dispatch({ type: START_LOADING })

    SignupAuth(values).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: SIGNUP
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload : "created" })
        } else {

            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

     //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })

    })
}


const LoginAuths = (values) => async dispatch => {
    dispatch({ type: START_LOADING })

    LoginAuth(values).then(({ data }) => {

        if (!data.err && data.msg !== "Confirm your email Please") {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: LOGIN
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload : "okey" })
            setAuthentication(data.msg.TOKEN , data.msg.USER)
        } else {
            
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

       // console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })

    })
}


const ForgotAuths = (values) => async dispatch => {
    dispatch({ type: START_LOADING })

    ForgotAuth(values).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: FORGOT
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload : "forgot" })

        } else {
            
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

//        console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })

    })
}


const ConfirmEmailAuths = (values) => async dispatch => {
    dispatch({ type: START_LOADING })

    ConfirmEmailAuth(values).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: CONFIRM
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload : "confirmed" })

        } else {
            
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

//        console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })

    })
}


const EditAccounts = (userId , values , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    EditAccount(userId , values , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: PROFILE
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload : "edited" })
            

            setLocalStorage("user" , {...getLocalStorage("user") , ...values})

        } else {
            
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

       // console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })

    })
}

const AddressAccounts = (userId , values , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    AddressAccount(userId , values , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: ADDRESS
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload : "edited" })

            setLocalStorage("user" ,{...getLocalStorage("user") , shippingaddress : {...getLocalStorage("user").shippingaddress ,...values} })

        } else {
            
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

      //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })

    })
}



const updateImageProfile = (userId , values , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Image(userId , values , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: ADDRESS
            })
            dispatch({ type: CLEAR_MESSAGE})
            console.log(data.msg);
            setLocalStorage("user" ,{...getLocalStorage("user") , image : data.msg })
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload : "updated" })

        } else {
            
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }

     //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })

    })
}

export {
    SignupAuths , LoginAuths , ForgotAuths , ConfirmEmailAuths , EditAccounts , AddressAccounts , updateImageProfile
}

