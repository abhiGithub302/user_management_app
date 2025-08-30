const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Generic fetch wrapper with error handling
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred. Please check your connection.');
  }
}

// Fetch all users from the API
export async function fetchUsers() {
  return apiRequest(`${BASE_URL}/users`);
}

// Fetch a single user by ID
export async function fetchUser(id) {
  return apiRequest(`${BASE_URL}/users/${id}`);
}

// Create a new user (simulated)
export async function createUser(userData) {
  return apiRequest(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

// Update an existing user (simulated)
export async function updateUser(id, userData) {
  return apiRequest(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

// Delete a user (simulated)
export async function deleteUser(id) {
  await apiRequest(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
}