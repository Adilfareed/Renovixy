"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useGetCurrentUser, useIsAuthenticated, useLogout } from "@/app/data/hooks/useAuth";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useIsAuthenticated();
  const { user, isLoading } = useGetCurrentUser();
  const { logout } = useLogout();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setProfileDropdown(false);
  };

  const getDashboardLink = () => {
    if (user?.role === "admin") {
      return "/dashboard";
    } else if (user?.role === "user") {
      return "/user";
    }
    return "/login";
  };

  const getDashboardLabel = () => {
    if (user?.role === "admin") {
      return "Admin Dashboard";
    } else if (user?.role === "user") {
      return "My Dashboard";
    }
    return "Dashboard";
  };

  const getUserInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/assets/LogoFinal.png" 
                alt="Renovixy" 
                width={90} 
                height={90}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-renovixy-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              {isLoading ? (
                <div className="animate-pulse bg-gray-300 text-gray-300 px-4 py-2 rounded-md text-sm font-medium">
                  Loading...
                </div>
              ) : isAuthenticated && user ? (
                <div 
                  className="relative" 
                  ref={dropdownRef}
                  onMouseEnter={() => setProfileDropdown(true)}
                  onMouseLeave={() => setProfileDropdown(false)}
                >
                  <div className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg transition-all duration-200 cursor-pointer">
                    {/* Profile Avatar */}
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                      {user.profilePic?.url ? (
                        <Image 
                          src={user.profilePic.url} 
                          alt="Profile" 
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-semibold text-sm">
                          {getUserInitial()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                            {user.profilePic?.url ? (
                              <Image 
                                src={user.profilePic.url} 
                                alt="Profile" 
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 font-semibold">
                                {getUserInitial()}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              {user.role === "admin" ? "Admin" : "User"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href={getDashboardLink()}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <FiUser className="w-4 h-4 mr-3 text-gray-400" />
                          <div className="flex-1">
                            <p className="font-medium">{getDashboardLabel()}</p>
                            <p className="text-xs text-gray-500">Manage your account</p>
                          </div>
                        </Link>
                        
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <FiLogOut className="w-4 h-4 mr-3" />
                          <div className="flex-1">
                            <p className="font-medium">Logout</p>
                            <p className="text-xs text-red-500">Sign out of your account</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="renovixy-gradient text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-renovixy-blue-700 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-renovixy-blue-600 p-2"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-renovixy-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isLoading ? (
                <div className="animate-pulse bg-gray-300 text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                  Loading...
                </div>
              ) : isAuthenticated && user ? (
                <>
                  {/* Mobile Profile Section */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                          {user.profilePic?.url ? (
                            <Image 
                              src={user.profilePic.url} 
                              alt="Profile" 
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-600 font-semibold text-lg">
                              {getUserInitial()}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            {user.role === "admin" ? "Admin" : "User"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={getDashboardLink()}
                      className="flex items-center bg-renovixy-blue-600 text-white px-3 py-3 rounded-lg text-base font-medium hover:bg-renovixy-blue-700 transition-colors mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiUser className="w-4 h-4 mr-3" />
                      <div className="flex-1 text-left">
                        <p className="font-medium">{getDashboardLabel()}</p>
                        <p className="text-xs text-blue-100">Manage your account</p>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-red-600 hover:bg-red-50 px-3 py-3 rounded-lg text-base font-medium transition-colors text-left w-full"
                    >
                      <FiLogOut className="w-4 h-4 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Logout</p>
                        <p className="text-xs text-red-500">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-renovixy-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-renovixy-blue-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
