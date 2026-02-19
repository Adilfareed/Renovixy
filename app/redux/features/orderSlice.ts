import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store/store";
import { API_CONFIG, getAuthToken } from "@/app/config/api";

/* ================= TYPES ================= */

export interface RelatedPic {
  url: string;
  public_id: string;
}

export interface Order {
  _id: string;
  customerRef: {
    _id: string;
    username: string;
    email: string;
  };
  name: string;
  phoneNumber: string;
  address: string;
  service: string;
  description: string;
  relatedPics: RelatedPic[];
  status: "pending" | "in progress" | "cancelled" | "complete";
  estimatedCost?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  pages: number;
}

interface OrderState {
  orders: Order[];
  total: number;
  page: number;
  pages: number;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: OrderState = {
  orders: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---------------------- Helper --------------------
const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
};

/* ================= THUNKS ================= */

/** GET ORDERS */
export const fetchOrders = createAsyncThunk<
  OrdersResponse,
  number | undefined,
  { rejectValue: string }
>("orders/fetchOrders", async (page = 1, thunkAPI) => {
  try {
    const token = getAuthToken();
    const res = await axios.get(`${API_CONFIG.ENDPOINTS.ORDERS.GET_ALL}?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to fetch orders"
    );
  }
});

/** CREATE ORDER */
export const createOrder = createAsyncThunk<
  Order,
  FormData,
  { rejectValue: string }
>("orders/createOrder", async (formData, thunkAPI) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(API_CONFIG.ENDPOINTS.ORDERS.CREATE, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to create order"
    );
  }
});

/** UPDATE ORDER (Status / Cost / Admin Notes) */
export const updateOrder = createAsyncThunk<
  Order,
  { id: string; payload: Partial<Order> },
  { rejectValue: string }
>("orders/updateOrder", async ({ id, payload }, thunkAPI) => {
  try {
    const token = getAuthToken();
    const res = await axios.put(API_CONFIG.ENDPOINTS.ORDERS.UPDATE_STATUS.replace(':id', id), payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to update order"
    );
  }
});

/* ================= SLICE ================= */

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ===== FETCH ORDERS ===== */
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching orders";
      });

    /* ===== CREATE ORDER ===== */
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload); // 🔄 Optimistic UI
        state.total += 1;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error creating order";
      });

    /* ===== UPDATE ORDER ===== */
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error updating order";
      });
  },
});

/* ================= EXPORT ================= */

export const { clearOrderError } = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;

export default orderSlice.reducer;
