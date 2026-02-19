
"use client";

import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { useEffect } from "react";
import { loadUser } from "./redux/features/authSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load user from localStorage on app start
    store.dispatch(loadUser());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
