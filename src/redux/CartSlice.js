import {createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct(state, action) {
      console.log(action.payload, '---->');
      state.push({...action.payload, quantity: 1});
    },
    removeProduct(state, action) {
      return state.filter(item => item.name !== action.payload.name);
    },
    incrementQuantity(state, action) {
      const product = state.find(
        element => element.name == action.payload.name,
      );
      product.quantity += 1;
    },
    decrementQuantity(state, action) {
      const product = state.find(
        element => element.name == action.payload.name,
      );
      if (product.quantity == 1) {
        return state.filter(item => item.name !== action.payload.name);
      } else {
        product.quantity--;
      }
    },
  },
});

export const {addProduct, removeProduct, incrementQuantity, decrementQuantity} =
  CartSlice.actions;
export default CartSlice.reducer;