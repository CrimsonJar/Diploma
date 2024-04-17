// Slice/topSalesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopSales = createAsyncThunk(
  "topSales/fetchTopSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:7070/api/top-sales");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const topSalesSlice = createSlice({
  name: "topSales",
  initialState: {
    items: [],
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default topSalesSlice.reducer;
