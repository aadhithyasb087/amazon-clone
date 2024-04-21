import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalProducts: 0,
  totalCartPrice: 0,
  userInfo: [],
  orderItems: [],
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice = (item.quantity * parseFloat(action.payload.price)).toFixed(2);
      } else {
        action.payload.totalPrice = (
          parseFloat(action.payload.quantity) * action.payload.price
        ).toFixed(2);
        state.cart.push(action.payload);
      }

      state.totalProducts++;

      state.totalCartPrice = (
        parseFloat(state.totalCartPrice) + parseFloat(action.payload.price)
      ).toFixed(2);
      if (state.totalCartPrice === undefined || state.totalCartPrice === null) {
        state.totalCartPrice = 0;
      }
      if (state.totalProducts === undefined || state.totalProducts === null) {
        state.totalProducts = 0;
      }
    },
    deleteProduct: (state, action) => {
      if (action.payload.deleteOneItem) {
        state.totalCartPrice = (
          parseFloat(state.totalCartPrice) - parseFloat(action.payload.price)
        ).toFixed(2);
        state.totalProducts--;
        const item = state.cart.find((item) => item.id === action.payload.id);
        item.quantity--;
        item.totalPrice = (item.quantity * parseFloat(action.payload.price)).toFixed(2);
        if (item.quantity === 0) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
          
        }
      } else {
        state.totalCartPrice = (
          parseFloat(state.totalCartPrice) - parseFloat(action.payload.totalPrice)
        ).toFixed(2);
        state.totalProducts -= action.payload.quantity;
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
      if (state.totalCartPrice === undefined || state.totalCartPrice === null) {
        state.totalCartPrice = 0;
      }
      if (state.totalProducts === undefined || state.totalProducts === null) {
        state.totalProducts = 0;
      }
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalCartPrice = 0;
      state.totalProducts = 0;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    signOutReducer: (state) => {
      state.userInfo = [];
      state.cart = [];
      state.totalCartPrice = 0;
      state.totalProducts = 0;
      state.orderItems=[];
    },
    setOrderItems: (state, action) => {
      state.orderItems = action.payload.orderItems || [];
    },
  },
});

export const {
  addToCart,
  deleteProduct,
  clearCart,
  setUserInfo,
  signOutReducer,
  setOrderItems,
} = amazonSlice.actions;
export default amazonSlice.reducer;
