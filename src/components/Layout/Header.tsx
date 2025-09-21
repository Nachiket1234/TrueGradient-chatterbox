import React from 'react';
import styled from 'styled-components';
import { Bell, Coins } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { toggleNotificationPanel } from '@/store/slices/notificationSlice';
import { NotificationPanel } from './NotificationPanel';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CreditsDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  color: #475569;
`;

const NotificationButton = styled.button<{ hasUnread: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ hasUnread }) => hasUnread ? '#3b82f6' : '#f1f5f9'};
  color: ${({ hasUnread }) => hasUnread ? 'white' : '#64748b'};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ hasUnread }) => hasUnread ? '#2563eb' : '#e2e8f0'};
  }

  ${({ hasUnread }) => hasUnread && `
    &::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid white;
    }
  `}
`;

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { credits } = useAppSelector((state) => state.ui);
  const { unreadCount, isOpen } = useAppSelector((state) => state.notifications);

  const handleNotificationClick = () => {
    dispatch(toggleNotificationPanel());
  };

  return (
    <>
      <HeaderContainer>
        <Logo>AI Chat</Logo>
        <HeaderActions>
          <CreditsDisplay>
            <Coins size={16} />
            <span>{credits.toLocaleString()}</span>
          </CreditsDisplay>
          <NotificationButton
            hasUnread={unreadCount > 0}
            onClick={handleNotificationClick}
          >
            <Bell size={20} />
          </NotificationButton>
        </HeaderActions>
      </HeaderContainer>
      {isOpen && <NotificationPanel />}
    </>
  );
};