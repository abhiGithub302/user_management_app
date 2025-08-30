import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { useUser, useUsers } from '../hooks/useUsers';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

// Page for editing an existing user
export function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = parseInt(id, 10);
  const { user, loading, error } = useUser(userId);
  const { updateUser } = useUsers();

  // Handle form submission
  const handleSubmit = async (userData) => {
    const success = await updateUser(userId, userData);
    if (success) {
      navigate('/', { replace: true });
    }
    return success;
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading user data..." />;
  }

  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={error || 'User not found'} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit User</h1>
        <p className="text-gray-600">Update {user.name}'s information</p>
      </div>
      
      <UserForm
        user={user}
        onSubmit={handleSubmit}
        title={`Edit ${user.name}`}
        submitButtonText="Update User"
      />
    </div>
  );
}