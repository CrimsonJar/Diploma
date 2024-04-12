import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ categoryId, offset, query = "" }, { getState, rejectWithValue }) => {
    const state = getState();
    const limit = state.items.limit; // лимит загрузки элементов
    let url = `http://localhost:7070/api/items`;
    const params = new URLSearchParams();

    if (categoryId && categoryId !== 0) {
      params.append("categoryId", categoryId);
    }

    if (query) {
      params.append("q", query);
    }

    params.append("offset", offset);
    params.append("limit", limit);
    url += params.toString() ? `?${params}` : "";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchItemsByCategory = createAsyncThunk(
  "items/fetchItemsByCategory",
  async (categoryId, { getState, rejectWithValue }) => {
    const state = getState();
    const limit = state.items.limit; // лимит загрузки элементов
    let url = `http://localhost:7070/api/items`;
    const params = new URLSearchParams();

    if (categoryId && categoryId !== 0) {
      params.append("categoryId", categoryId);
    }

    params.append("offset", 0);
    params.append("limit", limit);
    url += `?${params}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
    activeCategoryId: null,
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
        state.status = "succeeded";
        if (state.offset === 0) {
          state.items = action.payload; // Первая загрузка, заменяем элементы
        } else {
          state.items = [...state.items, ...action.payload]; // Дальнейшая загрузка, добавляем элементы
        }
        state.hasMoreItems = action.payload.length === state.limit;
        state.isLoading = false;
        state.isInitialLoadCompleted = true; // Устанавливаем в true для всех успешных загрузок
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
        state.items = action.payload; // Загрузка по категории, заменяем элементы
        state.hasMoreItems = action.payload.length === state.limit;
        state.isLoading = false;
        state.isInitialLoadCompleted = true; // Устанавливаем в true для всех успешных загрузок
        state.activeCategoryId = action.meta.arg;
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