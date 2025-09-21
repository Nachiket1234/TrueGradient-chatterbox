import { Notification, ApiResponse } from '@/types';
import { apiService } from './api';

class NotificationService {
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    // Mock implementation - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'message',
          title: 'New Message',
          message: 'Alice sent you a message',
          timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          isRead: false,
        },
        {
          id: '2',
          type: 'system',
          title: 'System Update',
          message: 'Your account has been updated successfully',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          isRead: false,
        },
        {
          id: '3',
          type: 'message',
          title: 'New Message',
          message: 'Bob replied to your message',
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          isRead: true,
        },
        {
          id: '4',
          type: 'warning',
          title: 'Low Credits',
          message: 'Your credit balance is running low',
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          isRead: true,
        },
      ];

      return {
        success: true,
        data: mockNotifications,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch notifications',
      };
    }
  }

  async markAsRead(notificationId: string): Promise<ApiResponse<null>> {
    // Mock implementation - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return {
        success: true,
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to mark notification as read',
      };
    }
  }

  async markAllAsRead(): Promise<ApiResponse<null>> {
    // Mock implementation - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        success: true,
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to mark all notifications as read',
      };
    }
  }
}

export const notificationService = new NotificationService();