import {combineReducers} from 'redux';
import auth from './auth';
import product from './product'
import cart from './cart'
import users from './users'


export default combineReducers({
    auth,
    product,
    cart,
    users
});