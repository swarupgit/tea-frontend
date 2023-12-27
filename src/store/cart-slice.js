import { createSlice } from "@reduxjs/toolkit";

const initState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { ...initState },
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload;
    },
    setTotal(state, action) {
      state.totalAmount = action.payload;
    },
    resetCart(state, action) {
      state.cartItems = initState.cartItems;
      state.totalAmount = initState.totalAmount;
    },
    addToCart(state, action) {
      const payload = action.payload;
      const findItem = state.cartItems.find((i) => i.id === payload.item.id);
      if (findItem) {
        findItem.amount += payload.item.amount;
        findItem.price += payload.item.price;
      } else {
        state.cartItems.push(payload.item);
      }
      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + item.price;
      }, 0);
      localStorage.setItem("ci", btoa(JSON.stringify(state.cartItems)));
      localStorage.setItem("cit", btoa(state.totalAmount));
    },
    updateCart(state, action) {
      const payload = action.payload;
      const items = JSON.parse(JSON.stringify(state.cartItems));
      const findItem = items.find((i) => i.id === payload.item.id);
      findItem.amount -= payload.item.amount;
      findItem.price -= payload.item.price;
      const index = items.indexOf(findItem);
      console.log("it", findItem, payload.item.id, state.cartItems, index);

      if (findItem.amount < 1) {
        console.log("removing");
        items.splice(index, 1);
      } else {
        console.log("keeping");
        items[index] = findItem;
      }
      state.totalAmount = items.reduce((total, item) => {
        return total + item.price;
      }, 0);
      state.cartItems = items;
      localStorage.setItem("ci", btoa(JSON.stringify(items)));
      localStorage.setItem("cit", btoa(state.totalAmount));
      console.log(items, state.cartItems);
    },
    reloadCart(state, action) {
      state.cartItems = JSON.parse(atob(localStorage.getItem("ci")));
      state.totalAmount = atob(localStorage.getItem("cit"));
    },
  },
  extraReducers(builder) {},
});

export const getAllCartItems = (state) => state.cart.cartItems;
export const getCartTotalAmount = (state) => state.cart.totalAmount;

export const cartActions = cartSlice.actions;

export default cartSlice;
