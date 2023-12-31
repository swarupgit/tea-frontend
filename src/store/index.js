import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import itemsSlice from "./items-slice";
import orderSlice from "./order-slice";
import quoteSlice from "./quote-slice";
import stockSlice from "./stock-slice";
import toastSlice from "./toast-slice";

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    toast: toastSlice.reducer,
    order: orderSlice.reducer,
    quote: quoteSlice.reducer,
    stock: stockSlice.reducer,
  },
});

export default store;
