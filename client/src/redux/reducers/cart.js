import {
  PRODUCT_ADDED_TO_CART,
  PRODUCT_DELETED_FROM_CART,
  CART_CLEAR,
} from "../actions/types";

const initialState = {
  loading: true,
  products: [],
};

export default function product(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ADDED_TO_CART:
    case PRODUCT_DELETED_FROM_CART:
    case CART_CLEAR:
      return {
        ...state,
        loading: false,
        products: payload,
      };

    default:
      return state;
  }
}
