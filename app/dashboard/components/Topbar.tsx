"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useGetCurrentUser, useIsAuthenticated } from '../../data/hooks';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Topbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Get user info from useGetCurrentUser hook for real-time updates
  const { user, isLoading } = useGetCurrentUser();
  const { isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    // Clear auth token and redirect
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="w-full bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, show default
  if (!isAuthenticated || !user) {
    return (
      <div className="w-full bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          <span className="font-semibold">Guest</span>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">G</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      
      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {user?.username || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role || 'admin'}
              </p>
            </div>
            
            <div className="relative">
              {user?.profilePic?.url ? (
                <img
                  src={user.profilePic.url}
                  alt={user.username || 'profile'}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-white font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
              )}
              
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {user?.profilePic?.url ? (
                    <img
                      src={user.profilePic.url}
                      alt={user.username || 'profile'}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {user?.username?.charAt(0)?.toUpperCase() || 'A'}
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <p className="font-semibold text-gray-900">
                      {user?.username || 'Admin User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || 'admin@example.com'}
                    </p>
                    <p className="text-xs text-gray-400">
                      Role: {user?.role || 'admin'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaUser className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Link>
                
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaCog className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
