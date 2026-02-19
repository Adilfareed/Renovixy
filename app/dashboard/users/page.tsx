"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaEdit, FaTrash, FaUserCheck, FaUserTimes, FaSearch, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import Table from '../components/table';
import { useGetAllUsers, useSearchUsers } from '../../data/hooks';

export default function UsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, total, page, pages, isLoading, error } = useGetAllUsers({
    search: searchTerm,
    page: currentPage,
    limit: 10,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real implementation, you would fetch users for the new page
    // dispatch(fetchUsers({ page }));
  };

  const getRoleBadge = (role?: string) => {
    const roleColors: { [key: string]: string } = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-blue-100 text-blue-800',
      user: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${roleColors[role || 'user'] || roleColors.user}`}>
        {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}
      </span>
    );
  };

  // Prepare table data
  const tableData = users.map((user: any) => [
    user.username || 'N/A',
    user.email || 'N/A',
    user.role || 'N/A',
    user.phoneNumber || 'N/A',
    user.address || 'N/A',
    getRoleBadge(user.role),
    new Date(user.createdAt).toLocaleDateString(),
  ]);

  const tableColumns = ['Username', 'Email', 'Role', 'Phone', 'Address', 'Role Badge', 'Joined'];

  const pagination = {
    page: Number(page),
    limit: 10,
    total: Number(total),
    totalPages: Number(pages),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                <p className="text-gray-600 mt-1">Manage system users</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <FaFilter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg">Error loading users</div>
            <p className="text-gray-600 mt-2">{error?.message || 'An error occurred'}</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {users.length} of {pagination?.total || users.length} users
              </p>
            </div>

            {/* Users Table */}
            <Table
              columns={tableColumns}
              data={tableData}
              pagination={pagination}
              onPageChange={handlePageChange}
            />

            {/* Empty State */}
            {users.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                  <FaUserTimes className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'No users have been added yet'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
