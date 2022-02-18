import { createStore, applyMiddleware , combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loading';
import ordersReducer from './reducers/orders';
import messageReducer from './reducers/message';
import productsReducer from './reducers/products';
import cartsReducer from './reducers/carts';
import wishlistReducer from './reducers/wishlist';
import mainReducer from './reducers/main';
import subscribeReducer from './reducers/subscribe';
import userReducer from './reducers/user';
import contactReducer from './reducers/contact';
import fileReducer from './reducers/file';


const middlewares = [thunk]

const reducer = combineReducers({
    loading : loadingReducer ,
    orders : ordersReducer ,
    message : messageReducer ,
    products : productsReducer,
    carts : cartsReducer,
    wishlist : wishlistReducer ,
    main : mainReducer ,
    subscribe : subscribeReducer ,
    user : userReducer ,
    contact : contactReducer ,
    file : fileReducer ,
})

const initialState = {}

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middlewares)))

export default store ;