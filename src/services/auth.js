import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    Headers : {
       "Content-Type" : "application/json" 
    } 
    
}
const SignupAuth = async (data) => {
 return  await axios.post(`${Host.ROOT}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.signup}` , data , config)
}


const LoginAuth = async (data) => {
    return  await  axios.post(`${Host.ROOT}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.login}` , data , config)
}

const ForgotAuth = async (data) => {
    return  await  axios.put(`${Host.ROOT}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.forgot}` , data , config)
}

const ConfirmEmailAuth = async (id) => {
    return  await  axios.put(`${Host.ROOT}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.confirm}/${id}`, config)
}


export {SignupAuth , LoginAuth , ForgotAuth , ConfirmEmailAuth}


