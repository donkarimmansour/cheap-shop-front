import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}


const List = async (filter , authorization) => {
    return  await  axios.get(`${Host.ROOT}${ApiEndpoints.  WishlistEndpoints.route}${ApiEndpoints.  WishlistEndpoints.list}` 
    , { headers :  {...config.headers , ...authorization} , params : {...filter} } )
}

const Create = async (data , authorization) => {
  return  await  axios.post(`${Host.ROOT}${ApiEndpoints.  WishlistEndpoints.route}${ApiEndpoints.  WishlistEndpoints.create}` 
  , data , { headers :  {...config.headers , ...authorization} })
} 

const Delete = async (id , authorization) => {
  return  await  axios.delete(`${Host.ROOT}${ApiEndpoints.  WishlistEndpoints.route}${ApiEndpoints.  WishlistEndpoints.delete}/${id}`  , { headers :  {...config.headers , ...authorization} } )
}


export {
  List ,
  Create , 
  Delete 
}