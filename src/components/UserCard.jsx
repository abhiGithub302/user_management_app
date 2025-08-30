import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Mail, Phone, Globe } from 'lucide-react';

// Individual user card component with actions
export function UserCard({ user, onDelete, isDeleting = false }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="p-6">
        {/* User header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">@{user.username}</p>
          </div>
        </div>

        {/* User details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{user.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Globe className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{user.website}</span>
          </div>
        </div>

        {/* Company info */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900">{user.company.name}</p>
          <p className="text-xs text-gray-600 mt-1">{user.company.catchPhrase}</p>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Link
            to={`/user/${user.id}`}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Link>
          
          <Link
            to={`/edit/${user.id}`}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}