import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AuthState {
  token: string | null;
  userId: number | null;
  email: string | null; // Add email field to the state
}

const initialState: AuthState = {
  token: null,
  userId: null,
  email: null, // Initialize email in the state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    storeUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    storeEmail: (state, action: PayloadAction<string>) => { // Add storeEmail action
      state.email = action.payload;
    },
    clearEmail: (state) => { // Add clearEmail action
      state.email = null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

// Selectors
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectEmail = (state: RootState) => state.auth.email; // Add selectEmail selector

// Export actions
export const { storeToken, storeUserId, storeEmail, clearAuth, clearEmail } = authSlice.actions;
export default authSlice.reducer;
