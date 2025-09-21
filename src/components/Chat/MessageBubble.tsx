import React from 'react';
import styled from 'styled-components';
import { Message } from '@/types';
import { formatDistanceToNow } from 'date-fns';

const MessageContainer = styled.div<{ isOwn: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-direction: ${({ isOwn }) => isOwn ? 'row-reverse' : 'row'};
`;

const Avatar = styled.div<{ src?: string; isVisible: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src})` : '#e2e8f0'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
`;

const MessageContent = styled.div<{ isOwn: boolean }>`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-items: ${({ isOwn }) => isOwn ? 'flex-end' : 'flex-start'};
`;

const MessageBubbleContainer = styled.div<{ isOwn: boolean }>`
  background: ${({ isOwn }) => isOwn ? '#3b82f6' : 'white'};
  color: ${({ isOwn }) => isOwn ? 'white' : '#1e293b'};
  padding: 0.75rem 1rem;
  border-radius: 18px;
  border-bottom-left-radius: ${({ isOwn }) => isOwn ? '18px' : '4px'};
  border-bottom-right-radius: ${({ isOwn }) => isOwn ? '4px' : '18px'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  line-height: 1.4;
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const MessageTime = styled.span<{ isOwn: boolean }>`
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.25rem;
  text-align: ${({ isOwn }) => isOwn ? 'right' : 'left'};
`;

interface MessageBubbleProps {
  message: Message;
  showAvatar: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, showAvatar }) => {
  const isOwn = message.senderId === '1'; // Replace with actual current user ID

  return (
    <MessageContainer isOwn={isOwn}>
      <Avatar 
        src={isOwn ? undefined : 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'} 
        isVisible={showAvatar && !isOwn}
      />
      <MessageContent isOwn={isOwn}>
        <MessageBubbleContainer isOwn={isOwn}>
          <MessageText>{message.content}</MessageText>
        </MessageBubbleContainer>
        <MessageTime isOwn={isOwn}>
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </MessageTime>
      </MessageContent>
    </MessageContainer>
  );
};