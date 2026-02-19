import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG, getAuthToken } from '@/app/config/api';
import { Service } from '@/app/types';

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
  selectedService: Service | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
  selectedService: null,
  pagination: null,
};

// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_CONFIG.ENDPOINTS.SERVICES.GET_ALL);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch services');
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (serviceData: FormData, thunkAPI) => {
    try {
      const token = getAuthToken();
      const res = await axios.post(API_CONFIG.ENDPOINTS.SERVICES.CREATE, serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create service');
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, serviceData }: { id: string; serviceData: FormData }, thunkAPI) => {
    try {
      const token = getAuthToken();
      const res = await axios.put(API_CONFIG.ENDPOINTS.SERVICES.UPDATE.replace(':id', id), serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id: string, thunkAPI) => {
    try {
      const token = getAuthToken();
      await axios.delete(API_CONFIG.ENDPOINTS.SERVICES.DELETE.replace(':id', id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete service');
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(API_CONFIG.ENDPOINTS.SERVICES.GET_BY_ID.replace(':id', id));
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch service');
    }
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch services
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      });

    // Create service
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create service';
      });

    // Update service
    builder
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const { _id, serviceData } = action.payload;
        const index = state.services.findIndex(service => service._id === _id);
        if (index !== -1) {
          state.services[index] = { ...state.services[index], ...serviceData };
        }
        if (state.selectedService && state.selectedService._id === _id) {
          state.selectedService = { ...state.selectedService, ...serviceData };
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update service';
      });

    // Delete service
    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(service => service._id !== action.payload);
        if (state.selectedService && state.selectedService._id === action.payload) {
          state.selectedService = null;
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete service';
      });

    // Fetch service by ID
    builder
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch service';
      });
  },
});

export const { clearError, setSelectedService, clearSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
