import {
    PRODUCTS_LOADED,
    PRODUCTS_ERROR,
    DELETE_PRODUCT,
} from '../actions/types';

const initialState = {
    loading: true,
    products: [],
};

export default function product (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case PRODUCTS_LOADED:
            return {
                ...state,
                loading: false,
                products: payload,
            };
        case PRODUCTS_ERROR:
        case DELETE_PRODUCT:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
