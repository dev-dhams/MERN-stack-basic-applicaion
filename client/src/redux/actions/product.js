import {
  PRODUCTS_LOADED,
  PRODUCTS_ERROR,
  DELETE_PRODUCT,
} from "../actions/types";

import axios from "axios";

// Get product
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: PRODUCTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete('/api/products/' + id);
    dispatch({
      type: DELETE_PRODUCT,
      payload: res.data,
    });
    alert("Product deleted successfully")
    dispatch(getProducts());
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};
