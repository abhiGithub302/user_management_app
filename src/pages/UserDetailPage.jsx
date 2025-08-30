import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../hooks/useUsers';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Building,
  User as UserIcon
} from 'lucide-react';

// Detailed view of a single user
export function UserDetailPage() {
  const { id } = useParams();
  const userId = parseInt(id, 10);
  const { user, loading, error } = useUser(userId);

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading user details..." />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={error} />
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">User not found</h2>
        <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </Link>
        
        <Link
          to={`/edit/${user.id}`}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          <Edit className="w-4 h-4" />
          <span>Edit User</span>
        </Link>
      </div>

      {/* User details */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* User header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-blue-100 text-lg">@{user.username}</p>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          {/* Address information */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">
                  {user.address.street}, {user.address.suite}
                </p>
                <p className="text-gray-600">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>
          </div>

          {/* Company information */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Company</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Building className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 text-lg">{user.company.name}</p>
                <p className="text-gray-600 italic mb-2">"{user.company.catchPhrase}"</p>
                <p className="text-sm text-gray-500">{user.company.bs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}