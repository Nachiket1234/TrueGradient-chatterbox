import React from 'react';
import styled from 'styled-components';
import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';

const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 0.875rem;
`;

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <MessageListContainer>
        <EmptyState>No messages yet. Start the conversation!</EmptyState>
      </MessageListContainer>
    );
  }

  return (
    <MessageListContainer>
      {messages.map((message, index) => {
        const prevMessage = index > 0 ? messages[index - 1] : null;
        const showAvatar = !prevMessage || prevMessage.senderId !== message.senderId;
        
        return (
          <MessageBubble
            key={message.id}
            message={message}
            showAvatar={showAvatar}
          />
        );
      })}
    </MessageListContainer>
  );
};