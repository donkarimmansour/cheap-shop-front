import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}


const List = async (filter , authorization) => {
    return  await  axios.get(`${Host.ROOT}${ApiEndpoints.OrdersEndpoints.route}${ApiEndpoints.OrdersEndpoints.list}` 
    , { headers :  {...config.headers , ...authorization} , params : {...filter} } )
}

const Create = async (data , authorization) => {
  return  await  axios.post(`${Host.ROOT}${ApiEndpoints.OrdersEndpoints.route}${ApiEndpoints.OrdersEndpoints.create}` 
  , data , { headers :  {...config.headers , ...authorization} })
} 


const Calculate = async (data , authorization) => {
  return  await  axios.post(`${Host.ROOT}${ApiEndpoints.OrdersEndpoints.route}${ApiEndpoints.OrdersEndpoints.calculate}` 
  , data , { headers :  {...config.headers , ...authorization} })
} 
const Edit = async (id , data , authorization) => {
  return  await  axios.put(`${Host.ROOT}${ApiEndpoints.OrdersEndpoints.route}${ApiEndpoints.OrdersEndpoints.edit}/${id}` ,  data , { headers :  {...config.headers , ...authorization}  }  )
}

const Delete = async (id , authorization) => {
  return  await  axios.delete(`${Host.ROOT}${ApiEndpoints.OrdersEndpoints.route}${ApiEndpoints.OrdersEndpoints.delete}/${id}`  , { headers :  {...config.headers , ...authorization} } )
}


export {
  List ,
  Create , 
  Edit ,
  Delete  ,
  Calculate
}