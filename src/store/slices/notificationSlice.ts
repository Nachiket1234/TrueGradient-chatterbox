import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState, Notification } from '@/types';
import { notificationService } from '@/services/notificationService';

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isOpen: false,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.getNotifications();
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.error || 'Failed to fetch notifications');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch notifications');
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const response = await notificationService.markAsRead(notificationId);
      if (response.success) {
        return notificationId;
      }
      return rejectWithValue(response.error || 'Failed to mark notification as read');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark notification as read');
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.markAllAsRead();
      if (response.success) {
        return true;
      }
      return rejectWithValue(response.error || 'Failed to mark all notifications as read');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark all notifications as read');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleNotificationPanel: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeNotificationPanel: (state) => {
      state.isOpen = false;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.isRead) {
          state.unreadCount -= 1;
        }
        state.notifications.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.isRead).length;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          state.unreadCount -= 1;
        }
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications.forEach(notification => {
          notification.isRead = true;
        });
        state.unreadCount = 0;
      });
  },
});

export const {
  toggleNotificationPanel,
  closeNotificationPanel,
  addNotification,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;