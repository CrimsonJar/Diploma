import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitOrder = createAsyncThunk(
  "cart/submitOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:7070/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.status === 204) {
        return {};
      } else {
        return await response.json();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    orderStatus: "idle", // 'idle', 'pending', 'succeeded', 'failed'
    orderError: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      // Поиск существующего товара с таким же id и размером
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.count += newItem.count;
      } else {
        state.items.push(newItem);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItemFromCart: (state, action) => {
      const { itemId, size } = action.payload;
      // Фильтрация элементов корзины для удаления конкретного товара по id и размеру
      state.items = state.items.filter(
        (item) => item.id !== itemId || item.size !== size
      );
      // Обновление localStorage после удаления элемента
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    resetOrderStatus: (state) => {
      state.orderStatus = "idle";
      state.orderError = null;
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        console.log("pending", state);
        state.orderStatus = "pending";
      })
      .addCase(submitOrder.fulfilled, (state) => {
        console.log("succeeded", state);
        state.orderStatus = "succeeded";
        state.items = [];
        localStorage.removeItem("cart");
      })
      .addCase(submitOrder.rejected, (state, action) => {
        console.log("failed", state);
        state.orderStatus = "failed";
        state.orderError = action.payload;
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  resetOrderStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
