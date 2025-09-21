import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Sparkles } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { fetchMessages, markMessagesAsRead } from '@/store/slices/chatSlice';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  margin-left: 320px;
  background: #f8fafc;
`;

const WelcomeScreen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const WelcomeIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: white;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const WelcomeDescription = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const SuggestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  max-width: 800px;
  width: 100%;
`;

const SuggestionCard = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
`;

const SuggestionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const SuggestionDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.4;
`;

const ChatHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChatAvatar = styled.div<{ src?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src})` : '#e2e8f0'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const ChatInfo = styled.div`
  flex: 1;
`;

const ChatName = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const ChatStatus = styled.p`
  font-size: 0.875rem;
  color: #64748b;
`;

const suggestions = [
  {
    title: "Explain quantum computing in simple terms",
    description: "Get a clear, easy-to-understand explanation of quantum computing concepts"
  },
  {
    title: "Write a Python function to sort a list",
    description: "Generate clean, efficient Python code with proper documentation"
  },
  {
    title: "What are the benefits of meditation?",
    description: "Learn about the mental and physical health benefits of regular meditation"
  },
  {
    title: "Help me plan a weekend trip to Paris",
    description: "Get personalized recommendations for attractions, restaurants, and activities"
  }
];

export const ChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeConversation, conversations, messages } = useAppSelector((state) => state.chat);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversation);
  const conversationMessages = activeConversation ? messages[activeConversation] || [] : [];

  useEffect(() => {
    if (activeConversation) {
      dispatch(fetchMessages(activeConversation));
      dispatch(markMessagesAsRead(activeConversation));
    }
  }, [activeConversation, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  if (!activeConversation) {
    return (
      <ChatContainer>
        <WelcomeScreen>
          <WelcomeIcon>
            <Sparkles size={40} />
          </WelcomeIcon>
          <WelcomeTitle>Welcome to AI Chat</WelcomeTitle>
          <WelcomeDescription>
            Start a conversation with our AI assistant. Ask questions, get help with tasks, or explore ideas
            together.
          </WelcomeDescription>
          <SuggestionGrid>
            {suggestions.map((suggestion, index) => (
              <SuggestionCard key={index}>
                <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                <SuggestionDescription>{suggestion.description}</SuggestionDescription>
              </SuggestionCard>
            ))}
          </SuggestionGrid>
        </WelcomeScreen>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      {activeConv && (
        <ChatHeader>
          <ChatAvatar src={activeConv.participants[0]?.avatar} />
          <ChatInfo>
            <ChatName>
              {activeConv.title || activeConv.participants[0]?.username || 'Unknown'}
            </ChatName>
            <ChatStatus>
              {activeConv.participants[0]?.isOnline ? 'Online' : 'Offline'}
            </ChatStatus>
          </ChatInfo>
        </ChatHeader>
      )}
      
      <MessageList messages={conversationMessages} />
      <div ref={messagesEndRef} />
      
      {activeConversation && <MessageInput conversationId={activeConversation} />}
    </ChatContainer>
  );
};