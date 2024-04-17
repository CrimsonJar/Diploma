import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ categoryId, offset, query = "" }, { getState, rejectWithValue }) => {
    const state = getState();
    const limit = state.items.limit;
    let url = `http://localhost:7070/api/items`;
    const params = new URLSearchParams({ categoryId, q: query, offset, limit });

    url += params.toString() ? `?${params}` : "";

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: ({ categoryId, offset, query }, { getState }) => {
      const { items } = getState();
      const alreadyLoaded = items.items.some(
        (item) =>
          item.categoryId === categoryId &&
          item.offset === offset &&
          item.query === query
      );
      return !alreadyLoaded;
    },
  }
);

export const fetchItemsByCategory = createAsyncThunk(
  "items/fetchItemsByCategory",
  async (categoryId, { getState, rejectWithValue }) => {
    const state = getState();
    const limit = state.items.limit;
    let url = `http://localhost:7070/api/items`;
    const params = new URLSearchParams({
      ...(categoryId && categoryId !== 0 && { categoryId }),
      offset: 0,
      limit,
    });
    url += `?${params}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (categoryId, { getState }) => {
      const { items } = getState();
      const alreadyLoaded = items.items.some(
        (item) => item.categoryId === categoryId
      );
      return !alreadyLoaded;
    },
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    isLoading: false,
    offset: 0,
    limit: 6,
    hasMoreItems: true,
    isInitialLoadCompleted: false,
    activeCategoryId: 0,
    showTopSales: true,
  },
  reducers: {
    increaseOffset(state) {
      state.offset += state.limit;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    resetItems(state) {
      state.items = [];
      state.offset = 0;
      state.status = "idle";
      state.error = null;
      state.hasMoreItems = true;
      state.isInitialLoadCompleted = false;
    },
    setActiveCategory(state, action) {
      state.activeCategoryId = action.payload; // Устанавливаем активную категорию
    },
    setShowTopSales(state, action) {
      state.showTopSales = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded"; // Если offset равен 0, заменяем элементы, иначе добавляем новые элементы к существующим
        state.items =
          state.offset === 0
            ? action.payload
            : [...state.items, ...action.payload];
        state.hasMoreItems = action.payload.length === state.limit;
        state.isLoading = false;
        state.isInitialLoadCompleted = true;
        state.error = null; // Сброс ошибки после успешной загрузки
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
        state.hasMoreItems = false;
        state.isInitialLoadCompleted = false;
      })
      .addCase(fetchItemsByCategory.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchItemsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.hasMoreItems = action.payload.length === state.limit;
        state.isLoading = false;
        state.isInitialLoadCompleted = true;
        state.activeCategoryId = action.meta.arg;
        state.error = null; // Сброс ошибки после успешной загрузки по категории
      })
      .addCase(fetchItemsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
        state.hasMoreItems = false;
        state.isInitialLoadCompleted = false;
      });
  },
});

export const {
  increaseOffset,
  resetItems,
  setActiveCategory,
  setShowTopSales,
  setSearchQuery,
} = itemsSlice.actions;

export default itemsSlice.reducer;
