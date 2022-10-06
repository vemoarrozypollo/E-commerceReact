import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: [],
    reducers: {
      setCartProducts:(state ,action)=>{
        return action.payload
      }


    }
})
export const getCartProductsThunk = () => dispatch => {
  dispatch(setIsLoading(true));
  return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
    .then(res => dispatch(setCartProducts(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
}
export const addCartThunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cart , getConfig())
        .then(() => dispatch(getCartProductsThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchasesCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases',{},getConfig())
        .then(() => dispatch(setCartProducts([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCartProducts } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
