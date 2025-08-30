import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { useUsers } from '../hooks/useUsers';

// Page for creating a new user
export function CreateUserPage() {
  const navigate = useNavigate();
  const { createUser } = useUsers();

  // Handle form submission
  const handleSubmit = async (userData) => {
    const success = await createUser(userData);
    if (success) {
      navigate('/', { replace: true });
    }
    return success;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New User</h1>
        <p className="text-gray-600">Create a new user account in the system</p>
      </div>
      
      <UserForm
        onSubmit={handleSubmit}
        title="Create New User"
        submitButtonText="Create User"
      />
    </div>
  );
}