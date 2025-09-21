import React, { useState } from 'react';
import styled from 'styled-components';
import { Send, Paperclip } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { sendMessage } from '@/store/slices/chatSlice';

const InputContainer = styled.div`
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  font-size: 0.875rem;
  line-height: 1.4;
  max-height: 120px;
  min-height: 20px;
  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  ${({ variant = 'secondary' }) => {
    if (variant === 'primary') {
      return `
        background: #3b82f6;
        color: white;
        &:hover {
          background: #2563eb;
        }
        &:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }
      `;
    }
    return `
      background: transparent;
      color: #64748b;
      &:hover {
        background: #f1f5f9;
        color: #475569;
      }
    `;
  }}
`;

const CharacterCount = styled.span<{ isNearLimit: boolean }>`
  font-size: 0.75rem;
  color: ${({ isNearLimit }) => isNearLimit ? '#ef4444' : '#94a3b8'};
  margin-top: 0.5rem;
  text-align: right;
`;

interface MessageInputProps {
  conversationId: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ conversationId }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const maxLength = 2000;
  const isNearLimit = message.length > maxLength * 0.8;
  const canSend = message.trim().length > 0 && message.length <= maxLength && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;

    setIsLoading(true);
    try {
      await dispatch(sendMessage({ conversationId, content: message.trim() }));
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <ActionButton type="button" variant="secondary">
            <Paperclip size={18} />
          </ActionButton>
          
          <TextArea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight(e.target);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            maxLength={maxLength}
            rows={1}
          />
          
          <ActionButton 
            type="submit" 
            variant="primary"
            disabled={!canSend}
          >
            <Send size={18} />
          </ActionButton>
        </InputWrapper>
        
        {message.length > 0 && (
          <CharacterCount isNearLimit={isNearLimit}>
            {message.length}/{maxLength}
          </CharacterCount>
        )}
      </form>
      
      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem', textAlign: 'center' }}>
        Press Enter to send, Shift+Enter for new line
      </div>
    </InputContainer>
  );
};