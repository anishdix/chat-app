const API_URL = 'https://chat-app-n9h6.onrender.com/api';

//login user using jwt
export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};


//calling resgister api ,creates a user
export const register = async (username, password, email) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

//get message from db
export const getMessages = async (token) => {
  const response = await fetch(`${API_URL}/messages`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
};