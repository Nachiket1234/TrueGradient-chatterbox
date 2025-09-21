import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, AlertTriangle, Info, Check } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { 
  closeNotificationPanel, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  fetchNotifications 
} from '@/store/slices/notificationSlice';
import { formatDistanceToNow } from 'date-fns';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 200;
`;

const Panel = styled(motion.div)`
  position: fixed;
  top: 64px;
  right: 0;
  width: 400px;
  max-height: calc(100vh - 64px);
  background: white;
  border-left: 1px solid #e2e8f0;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  z-index: 201;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PanelTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
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

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
`;

const NotificationItem = styled.div<{ isRead: boolean }>`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background: ${({ isRead }) => isRead ? 'transparent' : '#f8fafc'};

  &:hover {
    background: #f1f5f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const NotificationIcon = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  
  ${({ type }) => {
    switch (type) {
      case 'message':
        return `
          background: #dbeafe;
          color: #3b82f6;
        `;
      case 'warning':
        return `
          background: #fef3c7;
          color: #f59e0b;
        `;
      case 'system':
        return `
          background: #e0f2fe;
          color: #0891b2;
        `;
      default:
        return `
          background: #f1f5f9;
          color: #64748b;
        `;
    }
  }}
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const NotificationMessage = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.5rem;
  display: block;
`;

const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: #64748b;
`;

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'message':
      return <MessageCircle size={16} />;
    case 'warning':
      return <AlertTriangle size={16} />;
    case 'system':
      return <Info size={16} />;
    default:
      return <Info size={16} />;
  }
};

export const NotificationPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeNotificationPanel());
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  const handleNotificationClick = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      dispatch(markNotificationAsRead(notificationId));
    }
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />
      <Panel
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <PanelHeader>
          <PanelTitle>
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </PanelTitle>
          <HeaderActions>
            {unreadCount > 0 && (
              <ActionButton onClick={handleMarkAllAsRead} title="Mark all as read">
                <Check size={16} />
              </ActionButton>
            )}
            <ActionButton onClick={handleClose}>
              <X size={16} />
            </ActionButton>
          </HeaderActions>
        </PanelHeader>
        
        <NotificationList>
          {notifications.length === 0 ? (
            <EmptyState>
              <p>No notifications yet</p>
            </EmptyState>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                isRead={notification.isRead}
                onClick={() => handleNotificationClick(notification.id, notification.isRead)}
              >
                <NotificationHeader>
                  <NotificationIcon type={notification.type}>
                    {getNotificationIcon(notification.type)}
                  </NotificationIcon>
                  <NotificationContent>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationMessage>{notification.message}</NotificationMessage>
                    <NotificationTime>
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </NotificationTime>
                  </NotificationContent>
                </NotificationHeader>
              </NotificationItem>
            ))
          )}
        </NotificationList>
      </Panel>
    </AnimatePresence>
  );
};