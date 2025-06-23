import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../fakedb/db'; 

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        state.isAuthenticated = true;
        state.user = foundUser;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.error = 'Please enter a valid username and password';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
