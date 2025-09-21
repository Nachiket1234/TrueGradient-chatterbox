import { LoginCredentials, SignupCredentials, User, ApiResponse } from '@/types';
import { apiService } from './api';

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    // Mock implementation - replace with actual API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (credentials.username === 'demo' && credentials.password === 'password') {
        const mockUser: User = {
          id: '1',
          username: credentials.username,
          email: 'demo@example.com',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
          isOnline: true,
        };
        
        return {
          success: true,
          data: {
            user: mockUser,
            token: 'mock-jwt-token-' + Date.now(),
          },
        };
      }
      
      return {
        success: false,
        error: 'Invalid username or password',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  }

  async signup(credentials: SignupCredentials): Promise<ApiResponse<AuthResponse>> {
    // Mock implementation - replace with actual API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const mockUser: User = {
        id: Date.now().toString(),
        username: credentials.username,
        email: credentials.email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        isOnline: true,
      };
      
      return {
        success: true,
        data: {
          user: mockUser,
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Signup failed',
      };
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      // In a real app, you might want to call an API endpoint to invalidate the token
      return {
        success: true,
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Logout failed',
      };
    }
  }

  async verifyToken(token: string): Promise<ApiResponse<{ user: User }>> {
    // Mock implementation - replace with actual API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock token verification
      if (token.startsWith('mock-jwt-token-')) {
        const mockUser: User = {
          id: '1',
          username: 'demo',
          email: 'demo@example.com',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
          isOnline: true,
        };
        
        return {
          success: true,
          data: { user: mockUser },
        };
      }
      
      return {
        success: false,
        error: 'Invalid token',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Token verification failed',
      };
    }
  }
}

export const authService = new AuthService();