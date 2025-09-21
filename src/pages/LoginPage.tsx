import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAppSelector } from '@/hooks';
import { LoginForm } from '@/components/Auth/LoginForm';
import { FlexCenter } from '@/styles/GlobalStyles';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 3rem;
  width: 100%;
  max-width: 480px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled(FlexCenter)`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 16px;
  margin: 0 auto 1.5rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

export const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageContainer>
      <LoginCard>
        <Header>
          <Logo>
            <Sparkles size={32} />
          </Logo>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to continue to AI Chat</Subtitle>
        </Header>
        <LoginForm />
      </LoginCard>
    </PageContainer>
  );
};