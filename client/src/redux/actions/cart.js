import {
    PRODUCT_ADDED_TO_CART,
    PRODUCT_DELETED_FROM_CART,
    CART_CLEAR
  } from "../actions/types";
    
  // Get product
  export const addProductToCart = (products) => async (dispatch) => {
      dispatch({
        type: PRODUCT_ADDED_TO_CART,
        payload: products,
      });
  };
  
  // Delete product
  export const deleteProductFromCart = (products) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DELETED_FROM_CART,
        payload: products,
      });
  };

  export const clearCart = (products) => async (dispatch) => {
    dispatch({
      type: CART_CLEAR,
      payload: [],
    });
};
  