import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity,size,name,price,stock) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: id,
      name: name,
      price: price,
      image: data.product.images[0].url,
      stock: stock,
      quantity,
      size
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Add to Cart
export const addCustomToCart = (id, quantity,size) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/custom/details/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.custom._id,
      name: data.custom.name,
      price: data.custom.price,
      image: data.custom.images[0].url,
      stock: data.custom.Stock,
      quantity,
      size: size
    },
  });
  console.log("design",dispatch.payload)
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
