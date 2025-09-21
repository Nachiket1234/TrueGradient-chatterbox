export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
  title?: string;
  isGroup: boolean;
}

export interface Notification {
  id: string;
  type: 'message' | 'system' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  error: string | null;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
}

export interface UIState {
  credits: number;
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}