import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { LoadingSpinner, FlexCenter } from '@/styles/GlobalStyles';
import styled from 'styled-components';

const LoadingContainer = styled(FlexCenter)`
  height: 100vh;
  background: #f8fafc;
`;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};