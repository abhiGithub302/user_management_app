import { useState, useEffect } from 'react';
import * as api from '../services/api';

// Custom hook for managing user state and operations
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await api.fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const createUser = async (userData) => {
    setError(null);
    try {
      const newUser = await api.createUser(userData);
      // Since JSONPlaceholder doesn't actually create the user,
      // we'll simulate it by adding to our local state with a new ID
      const simulatedUser = { ...newUser, id: Date.now() };
      setUsers(prev => [simulatedUser, ...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
      return false;
    }
  };

  // Update an existing user
  const updateUser = async (id, userData) => {
    setError(null);
    try {
      const updatedUser = await api.updateUser(id, userData);
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...updatedUser, id } : user
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      return false;
    }
  };

  // Delete a user
  const removeUser = async (id) => {
    setError(null);
    try {
      await api.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      return false;
    }
  };

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    removeUser,
    clearError: () => setError(null),
  };
}

// Custom hook for fetching a single user
export function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUser = await api.fetchUser(id);
        setUser(fetchedUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id]);

  return { user, loading, error };
}