import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG, getAuthToken } from '@/app/config/api';

export interface ServiceCategory {
  _id: string;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCategoryState {
  categories: ServiceCategory[];
  loading: boolean;
  error: string | null;
  selectedCategory: ServiceCategory | null;
}

const initialState: ServiceCategoryState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

// Async thunks
export const fetchServiceCategories = createAsyncThunk(
  'serviceCategories/fetchServiceCategories',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_CONFIG.ENDPOINTS.SERVICE_CATEGORIES.GET_ALL);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch service categories');
    }
  }
);

export const createServiceCategory = createAsyncThunk(
  'serviceCategories/createServiceCategory',
  async (categoryData: { name: string; icon: string; description: string }, thunkAPI) => {
    try {
      const token = getAuthToken();
      const res = await axios.post(API_CONFIG.ENDPOINTS.SERVICE_CATEGORIES.CREATE, categoryData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create service category');
    }
  }
);

export const updateServiceCategory = createAsyncThunk(
  'serviceCategories/updateServiceCategory',
  async ({ id, categoryData }: { id: string; categoryData: Partial<ServiceCategory> }, thunkAPI) => {
    try {
      const token = getAuthToken();
      const res = await axios.put(API_CONFIG.ENDPOINTS.SERVICE_CATEGORIES.UPDATE.replace(':id', id), categoryData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update service category');
    }
  }
);

export const deleteServiceCategory = createAsyncThunk(
  'serviceCategories/deleteServiceCategory',
  async (id: string, thunkAPI) => {
    try {
      const token = getAuthToken();
      await axios.delete(API_CONFIG.ENDPOINTS.SERVICE_CATEGORIES.DELETE.replace(':id', id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete service category');
    }
  }
);

export const fetchServiceCategoryById = createAsyncThunk(
  'serviceCategories/fetchServiceCategoryById',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(API_CONFIG.ENDPOINTS.SERVICE_CATEGORIES.GET_BY_ID.replace(':id', id));
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch service category');
    }
  }
);

const serviceCategorySlice = createSlice({
  name: 'serviceCategories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCategory: (state, action: PayloadAction<ServiceCategory | null>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch service categories
    builder
      .addCase(fetchServiceCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchServiceCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create service category
    builder
      .addCase(createServiceCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createServiceCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update service category
    builder
      .addCase(updateServiceCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(category => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        if (state.selectedCategory && state.selectedCategory._id === action.payload._id) {
          state.selectedCategory = action.payload;
        }
      })
      .addCase(updateServiceCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete service category
    builder
      .addCase(deleteServiceCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(category => category._id !== action.payload);
        if (state.selectedCategory && state.selectedCategory._id === action.payload) {
          state.selectedCategory = null;
        }
      })
      .addCase(deleteServiceCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch service category by ID
    builder
      .addCase(fetchServiceCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchServiceCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedCategory, clearSelectedCategory } = serviceCategorySlice.actions;
export default serviceCategorySlice.reducer;
