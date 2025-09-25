import { createSlice } from '@reduxjs/toolkit';

// Helper function to get user from localStorage
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

const initialState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem('accessToken'),
  isAuthenticated: !localStorage.getItem('accessToken'), // Fixed key name
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // Store in localStorage correctly
      localStorage.setItem('accessToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Stringify user object
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      // Clear localStorage on failure
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    // Add this to update auth state from localStorage (useful on page refresh)
    initializeAuth: (state) => {
      const token = localStorage.getItem('accessToken');
      const user = getUserFromLocalStorage();
      
      state.isAuthenticated = !!token;
      state.token = token;
      state.user = user;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError,
  initializeAuth 
} = authSlice.actions;

export default authSlice.reducer;