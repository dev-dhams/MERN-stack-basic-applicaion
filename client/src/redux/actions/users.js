import {
    USERS_LOADED,
    USERS_ERROR,
  } from "../actions/types";
  
  import axios from "axios";
  
  // getUsers
  export const getUsers = () => async (dispatch) => {
    try {
      const res = await axios.get("/api/users");
      dispatch({
        type: USERS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
      });
    }
  };
  
//   // Delete product
//   export const deleteProduct = (id) => async (dispatch) => {
//     try {
//       const res = await axios.delete('/api/products/' + id);
//       dispatch({
//         type: DELETE_PRODUCT,
//         payload: res.data,
//       });
//       alert("Product deleted successfully")
//       dispatch(getProducts());
//     } catch (err) {
//       dispatch({
//         type: PRODUCTS_ERROR,
//       });
//     }
//   };
  