import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCard } from '../components/UserCard';
import { LoadingSpinner, UserCardSkeleton } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SearchBar } from '../components/SearchBar';
import { useUsers } from '../hooks/useUsers';
import { Plus, Users } from 'lucide-react';

// Main home page displaying all users
export function HomePage() {
  const { users, loading, error, removeUser, clearError } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingUsers, setDeletingUsers] = useState(new Set());

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user deletion with loading state
  const handleDeleteUser = async (id) => {
    setDeletingUsers(prev => new Set(prev).add(id));
    const success = await removeUser(id);
    setDeletingUsers(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage your user database with ease</p>
        </div>
        
        <Link
          to="/create"
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Add New User</span>
        </Link>
      </div>

      {/* Search and stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search by name, email, or username..."
        />
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>
            {filteredUsers.length} of {users.length} users
            {searchTerm && ' (filtered)'}
          </span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <ErrorMessage message={error} onClose={clearError} />
      )}

      {/* Users grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDeleteUser}
              isDeleting={deletingUsers.has(user.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No users found' : 'No users available'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms or clear the search to see all users.'
              : 'Get started by adding your first user to the system.'
            }
          </p>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Search
            </button>
          ) : (
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add First User</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}