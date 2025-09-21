import { Conversation, Message, User, ApiResponse } from '@/types';
import { apiService } from './api';

class ChatService {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    // Mock implementation - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUsers: User[] = [
        {
          id: '2',
          username: 'alice_johnson',
          email: 'alice@example.com',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
          isOnline: true,
        },
        {
          id: '3',
          username: 'bob_smith',
          email: 'bob@example.com',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
          isOnline: false,
          lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          id: '4',
          username: 'carol_white',
          email: 'carol@example.com',
          avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
          isOnline: true,
        },
      ];

      const mockConversations: Conversation[] = [
        {
          id: '1',
          participants: [mockUsers[0]],
          lastMessage: {
            id: '1',
            content: 'Hey! How are you doing?',
            senderId: '2',
            conversationId: '1',
            timestamp: new Date(Date.now() - 300000), // 5 minutes ago
            type: 'text',
            isRead: false,
          },
          unreadCount: 2,
          updatedAt: new Date(Date.now() - 300000),
          isGroup: false,
        },
        {
          id: '2',
          participants: [mockUsers[1]],
          lastMessage: {
            id: '2',
            content: 'Thanks for the help earlier!',
            senderId: '1',
            conversationId: '2',
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            type: 'text',
            isRead: true,
          },
          unreadCount: 0,
          updatedAt: new Date(Date.now() - 3600000),
          isGroup: false,
        },
        {
          id: '3',
          participants: [mockUsers[2]],
          lastMessage: {
            id: '3',
            content: 'See you tomorrow!',
            senderId: '4',
            conversationId: '3',
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            type: 'text',
            isRead: false,
          },
          unreadCount: 1,
          updatedAt: new Date(Date.now() - 7200000),
          isGroup: false,
        },
      ];

      return {
        success: true,
        data: mockConversations,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch conversations',
      };
    }
  }

  async getMessages(conversationId: string): Promise<ApiResponse<Message[]>> {
    // Mock implementation - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockMessages: Record<string, Message[]> = {
        '1': [
          {
            id: '1',
            content: 'Hi there! How are you?',
            senderId: '1',
            conversationId: '1',
            timestamp: new Date(Date.now() - 3600000),
            type: 'text',
            isRead: true,
          },
          {
            id: '2',
            content: 'Hey! I\'m doing great, thanks for asking!',
            senderId: '2',
            conversationId: '1',
            timestamp: new Date(Date.now() - 3300000),
            type: 'text',
            isRead: true,
          },
          {
            id: '3',
            content: 'How about you? How\'s your day going?',
            senderId: '2',
            conversationId: '1',
            timestamp: new Date(Date.now() - 300000),
            type: 'text',
            isRead: false,
          },
        ],
        '2': [
          {
            id: '4',
            content: 'Thanks for helping me with the project!',
            senderId: '3',
            conversationId: '2',
            timestamp: new Date(Date.now() - 7200000),
            type: 'text',
            isRead: true,
          },
          {
            id: '5',
            content: 'No problem! Happy to help.',
            senderId: '1',
            conversationId: '2',
            timestamp: new Date(Date.now() - 3600000),
            type: 'text',
            isRead: true,
          },
        ],
        '3': [
          {
            id: '6',
            content: 'Are we still on for tomorrow?',
            senderId: '1',
            conversationId: '3',
            timestamp: new Date(Date.now() - 10800000),
            type: 'text',
            isRead: true,
          },
          {
            id: '7',
            content: 'Yes! See you at 3 PM.',
            senderId: '4',
            conversationId: '3',
            timestamp: new Date(Date.now() - 7200000),
            type: 'text',
            isRead: false,
          },
        ],
      };

      return {
        success: true,
        data: mockMessages[conversationId] || [],
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch messages',
      };
    }
  }

  async sendMessage(conversationId: string, content: string): Promise<ApiResponse<Message>> {
    // Mock implementation - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        senderId: '1', // Current user ID
        conversationId,
        timestamp: new Date(),
        type: 'text',
        isRead: true,
      };

      return {
        success: true,
        data: newMessage,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send message',
      };
    }
  }

  async createConversation(participantIds: string[]): Promise<ApiResponse<Conversation>> {
    // Mock implementation - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newConversation: Conversation = {
        id: Date.now().toString(),
        participants: [], // Would be populated with actual user data
        unreadCount: 0,
        updatedAt: new Date(),
        isGroup: participantIds.length > 1,
      };

      return {
        success: true,
        data: newConversation,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create conversation',
      };
    }
  }
}

export const chatService = new ChatService();