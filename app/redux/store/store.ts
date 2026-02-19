// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import orderReducer from '../features/orderSlice';
import projectReducer from '../features/projectSlice';
import serviceReducer from '../features/serviceSlice';
import serviceCategoryReducer from '../features/serviceCategorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    projects: projectReducer,
    services: serviceReducer,
    serviceCategories: serviceCategoryReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
