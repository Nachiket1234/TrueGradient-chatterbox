import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.5;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          height: 36px;
        `;
      case 'lg':
        return `
          padding: 0.75rem 2rem;
          font-size: 1rem;
          height: 48px;
        `;
      default:
        return `
          padding: 0.625rem 1.5rem;
          font-size: 0.875rem;
          height: 40px;
        `;
    }
  }}

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #f1f5f9;
          color: #475569;
          &:hover {
            background-color: #e2e8f0;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: #3b82f6;
          border-color: #3b82f6;
          &:hover {
            background-color: #3b82f6;
            color: white;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: #64748b;
          &:hover {
            background-color: #f1f5f9;
          }
        `;
      default:
        return `
          background-color: #3b82f6;
          color: white;
          &:hover {
            background-color: #2563eb;
          }
        `;
    }
  }}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: inherit;
    }
  }
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ hasError }) => hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
  display: block;
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;