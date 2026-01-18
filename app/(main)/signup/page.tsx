// app/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/hooks";
import { registerUser,  clearError } from "@/app/redux/features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error, isAuthenticated } = useAppSelector((s) => s.auth);

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      toast.success("Account Created! ");
      
        router.push("/");
     
    }
  }, [error, isAuthenticated, dispatch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl text-2xl font-bold">
              📘
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join us and start your journey!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username Field
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div> */}

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
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
              focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition 
            text-white font-semibold py-2 rounded-lg disabled:opacity-60 shadow-sm"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Sign-in */}
        <button
          className="w-full bg-white border border-gray-300 rounded-lg py-2 font-medium 
          hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="h-5" />
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
