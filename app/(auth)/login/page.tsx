// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/hooks";
import { loginUser,  clearError } from "@/app/redux/features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Mail, Lock } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated, user } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isContinuingQuote, setIsContinuingQuote] = useState(false);

  // Check if user is continuing a quote
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
      setIsContinuingQuote(redirectAfterLogin === 'order');
    }
  }, []);


  // Toasts + redirect based on role and redirect intent
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated && user) {
      toast.success("Login successful!");

      // Check if there's a redirect intent after login
      if (typeof window !== 'undefined') {
        const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
        localStorage.removeItem('redirectAfterLogin'); // Clean up
        
        if (redirectAfterLogin === 'order') {
          // Redirect to user dashboard to complete order (quote data will auto-open modal)
          router.push('/user');
          return;
        }
      }

      // Normal role-based redirect
      if (user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/user");
      }
    }
  }, [error, isAuthenticated, user, dispatch, router]);

  // Handle back navigation - preserve quote data if user goes back
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      // If user navigates back from login, don't clear quote data
      // The quote data should remain in localStorage for 24 hours
      if (typeof window !== 'undefined') {
        const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
        if (redirectAfterLogin === 'order') {
          // User is going back to home page, quote data should remain
          // Don't clear anything, let the home page handle it
        }
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Image 
              src="/assets/LogoFinal.png" 
              alt="Renovixy" 
              width={48} 
              height={48}
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Login to continue</p>
          
          {/* Quote continuation indicator */}
          {isContinuingQuote && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <p className="text-sm text-blue-800 font-medium">
                    Continue with your quote request
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('redirectAfterLogin');
                      setIsContinuingQuote(false);
                    }
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Your quote data has been saved and will be ready after login
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-renovixy-blue-400 text-black"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-renovixy-blue-400 text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-renovixy-blue-600 hover:bg-renovixy-blue-700 transition 
            text-white font-semibold py-2 rounded-lg disabled:opacity-60 renovixy-shadow"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          className="w-full bg-white border border-gray-300 rounded-lg py-2 font-medium 
          hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            className="h-5"
          />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-renovixy-blue-600 font-medium cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
