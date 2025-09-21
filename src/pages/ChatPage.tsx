import React from 'react';
import styled from 'styled-components';
import { Header } from '@/components/Layout/Header';
import { Sidebar } from '@/components/Layout/Sidebar';
import { ChatArea } from '@/components/Chat/ChatArea';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8fafc;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ChatPage: React.FC = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <ChatArea />
      </MainContent>
    </PageContainer>
  );
};