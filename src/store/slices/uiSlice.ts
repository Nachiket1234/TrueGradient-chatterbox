import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '@/types';

const initialState: UIState = {
  credits: 1250, // Based on the Figma design
  theme: 'light',
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCredits: (state, action: PayloadAction<number>) => {
      state.credits = action.payload;
    },
    updateCredits: (state, action: PayloadAction<number>) => {
      state.credits += action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  setCredits,
  updateCredits,
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
} = uiSlice.actions;

export default uiSlice.reducer;