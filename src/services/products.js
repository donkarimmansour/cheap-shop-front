import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}


const List = async (filter) => {
    return  await  axios.get(`${Host.ROOT}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.list}` 
    , { headers :  {...config.headers} , params : {...filter} } )
}

const ListTab = async (filter) => {
  return  await  axios.get(`${Host.ROOT}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.listtab}` 
  , { headers :  {...config.headers} , params : {...filter} } )
}

const ListDistinct = async (distinct) => {
  return  await  axios.post(`${Host.ROOT}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.distinct}` ,  { "distinct" : distinct } , config )
}

const ListCount = async (filter) => {
  return  await  axios.get(`${Host.ROOT}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.count}`  , { headers :  {...config.headers} , params : {...filter} } )
}

const Views = async (id , data) => {
  return  await  axios.put(`${Host.ROOT}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.views}/${id}` , data  , { headers :  {...config.headers} } )
}
export {
  List ,
  ListTab , 
  ListDistinct ,
  ListCount ,
  Views
}