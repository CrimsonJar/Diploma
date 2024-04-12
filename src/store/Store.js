import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import topSalesReducer from "../Slice/topSalesSlice";
import categoriesReducer from "../Slice/categoriesSlice";
import itemsReducer from "../Slice/itemsSlice";
import productReducer from "../Slice/productSlice";
import cartReducer from "../Slice/cartSlice";

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    categories: categoriesReducer,
    items: itemsReducer,
    product: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Использование thunk
});
