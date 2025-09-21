import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Plus, MessageCircle, Search, MoreHorizontal } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { fetchConversations, setActiveConversation } from '@/store/slices/chatSlice';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/styles/GlobalStyles';

const SidebarContainer = styled.aside`
  width: 320px;
  height: calc(100vh - 64px);
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 64px;
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  color: #64748b;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #f1f5f9;
    color: #475569;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  background: #f8fafc;
  transition: all 0.2s ease-in-out;

  &:focus {
    background: white;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
`;

const ConversationItem = styled.div<{ isActive: boolean }>`
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background: ${({ isActive }) => isActive ? '#f1f5f9' : 'transparent'};
  border-left: 3px solid ${({ isActive }) => isActive ? '#3b82f6' : 'transparent'};

  &:hover {
    background: #f8fafc;
  }
`;

const ConversationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ConversationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
`;

const Avatar = styled.div<{ src?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src})` : '#e2e8f0'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ConversationDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ConversationName = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LastMessage = styled.p<{ hasUnread: boolean }>`
  font-size: 0.75rem;
  color: ${({ hasUnread }) => hasUnread ? '#1e293b' : '#64748b'};
  font-weight: ${({ hasUnread }) => hasUnread ? '500' : '400'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConversationMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

const UnreadBadge = styled.div`
  background: #3b82f6;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: #64748b;
`;

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { conversations, activeConversation, isLoading } = useAppSelector((state) => state.chat);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const filteredConversations = conversations.filter(conversation => {
    const participantNames = conversation.participants.map(p => p.username.toLowerCase()).join(' ');
    return participantNames.includes(searchQuery.toLowerCase());
  });

  const handleConversationClick = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId));
  };

  const getConversationName = (conversation: any) => {
    if (conversation.title) return conversation.title;
    return conversation.participants[0]?.username || 'Unknown';
  };

  const getConversationAvatar = (conversation: any) => {
    return conversation.participants[0]?.avatar;
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>
          <Title>Conversations</Title>
          <CollapseButton>
            <MoreHorizontal size={16} />
          </CollapseButton>
        </SidebarTitle>
        
        <Button variant="primary" size="sm" fullWidth>
          <Plus size={16} />
          New Chat
        </Button>
        
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </SidebarHeader>

      <ConversationList>
        {isLoading ? (
          <EmptyState>Loading conversations...</EmptyState>
        ) : filteredConversations.length === 0 ? (
          <EmptyState>
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </EmptyState>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              isActive={activeConversation === conversation.id}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <ConversationHeader>
                <ConversationInfo>
                  <Avatar src={getConversationAvatar(conversation)}>
                    {!getConversationAvatar(conversation) && (
                      <MessageCircle size={16} />
                    )}
                  </Avatar>
                  <ConversationDetails>
                    <ConversationName>
                      {getConversationName(conversation)}
                    </ConversationName>
                    {conversation.lastMessage && (
                      <LastMessage hasUnread={conversation.unreadCount > 0}>
                        {conversation.lastMessage.content}
                      </LastMessage>
                    )}
                  </ConversationDetails>
                </ConversationInfo>
                <ConversationMeta>
                  {conversation.lastMessage && (
                    <Timestamp>
                      {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
                    </Timestamp>
                  )}
                  {conversation.unreadCount > 0 && (
                    <UnreadBadge>{conversation.unreadCount}</UnreadBadge>
                  )}
                </ConversationMeta>
              </ConversationHeader>
            </ConversationItem>
          ))
        )}
      </ConversationList>
    </SidebarContainer>
  );
};