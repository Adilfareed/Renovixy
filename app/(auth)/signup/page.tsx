// app/register/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/hooks";
import { RootState } from "@/app/redux/store/store";
import { registerUser,  clearError } from "@/app/redux/features/authSlice";
import { useCheckUsername } from "@/app/data/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error, isAuthenticated, user } = useAppSelector((state: any) => state.auth);

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [debouncedUsername, setDebouncedUsername] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isAvailable, isLoading: checkingUsername } = useCheckUsername(debouncedUsername);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedUsername(value);
    }, 500); // 500ms debounce
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated && user) {
      toast.success("Account Created! ");
      
        if (user.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/user");
        }
      
    }
  }, [error, isAuthenticated, dispatch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password, phoneNumber, address, role: "user" }));
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
          <h2 className="text-3xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join us and start your journey!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username Field */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-renovixy-blue-400 text-black"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          {username.length >= 3 && (
            <div className="text-sm mt-1">
              {checkingUsername ? (
                <span className="text-gray-500">Checking availability...</span>
              ) : isAvailable === true ? (
                <span className="text-green-600">✓ Username available</span>
              ) : isAvailable === false ? (
                <span className="text-red-600">✗ Username not available</span>
              ) : null}
            </div>
          )}

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

          {/* Phone Number Field */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-renovixy-blue-400 text-black"
              placeholder="Phone Number (Optional)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
            />
          </div>

          {/* Address Field */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-renovixy-blue-400 text-black"
              placeholder="Address (Optional)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-renovixy-blue-600 hover:bg-renovixy-blue-700 transition 
            text-white font-semibold py-2 rounded-lg disabled:opacity-60 renovixy-shadow"
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
            className="text-renovixy-blue-600 font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
