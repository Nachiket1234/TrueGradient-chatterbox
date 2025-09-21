import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Conversation, Message } from '@/types';
import { chatService } from '@/services/chatService';

const initialState: ChatState = {
  conversations: [],
  activeConversation: null,
  messages: {},
  isLoading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatService.getConversations();
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.error || 'Failed to fetch conversations');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch conversations');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const response = await chatService.getMessages(conversationId);
      if (response.success && response.data) {
        return { conversationId, messages: response.data };
      }
      return rejectWithValue(response.error || 'Failed to fetch messages');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ conversationId, content }: { conversationId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await chatService.sendMessage(conversationId, content);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.error || 'Failed to send message');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send message');
    }
  }
);

export const createConversation = createAsyncThunk(
  'chat/createConversation',
  async (participantIds: string[], { rejectWithValue }) => {
    try {
      const response = await chatService.createConversation(participantIds);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.error || 'Failed to create conversation');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create conversation');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversation = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      if (!state.messages[message.conversationId]) {
        state.messages[message.conversationId] = [];
      }
      state.messages[message.conversationId].push(message);
      
      // Update conversation's last message
      const conversation = state.conversations.find(c => c.id === message.conversationId);
      if (conversation) {
        conversation.lastMessage = message;
        conversation.updatedAt = message.timestamp;
        if (message.senderId !== 'current-user-id') { // Replace with actual current user ID
          conversation.unreadCount += 1;
        }
      }
    },
    markMessagesAsRead: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      const messages = state.messages[conversationId];
      if (messages) {
        messages.forEach(message => {
          message.isRead = true;
        });
      }
      
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
    updateConversation: (state, action: PayloadAction<Partial<Conversation> & { id: string }>) => {
      const index = state.conversations.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.conversations[index] = { ...state.conversations[index], ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Conversations
      .addCase(fetchConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
        state.error = null;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages[action.payload.conversationId] = action.payload.messages;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload;
        if (!state.messages[message.conversationId]) {
          state.messages[message.conversationId] = [];
        }
        state.messages[message.conversationId].push(message);
        
        // Update conversation
        const conversation = state.conversations.find(c => c.id === message.conversationId);
        if (conversation) {
          conversation.lastMessage = message;
          conversation.updatedAt = message.timestamp;
        }
      })
      // Create Conversation
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
        state.activeConversation = action.payload.id;
      });
  },
});

export const {
  setActiveConversation,
  addMessage,
  markMessagesAsRead,
  updateConversation,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;