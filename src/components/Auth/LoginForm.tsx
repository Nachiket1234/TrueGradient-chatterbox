import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { LoginCredentials } from '@/types';
import { Button, Input, Label, ErrorText, LoadingSpinner } from '@/styles/GlobalStyles';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PasswordInputWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: #475569;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const FormLink = styled(Link)`
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DemoCredentials = styled.div`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const DemoTitle = styled.h4`
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
`;

const DemoInfo = styled.p`
  color: #64748b;
  margin: 0;
`;

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginCredentials>();

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data: LoginCredentials) => {
    dispatch(loginUser(data));
  };

  const fillDemoCredentials = () => {
    setValue('username', 'demo');
    setValue('password', 'password');
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <DemoCredentials>
        <DemoTitle>Demo Credentials</DemoTitle>
        <DemoInfo>Username: demo | Password: password</DemoInfo>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={fillDemoCredentials}
          style={{ marginTop: '0.5rem' }}
        >
          Fill Demo Credentials
        </Button>
      </DemoCredentials>

      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          hasError={!!errors.username}
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
        />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <PasswordInputWrapper>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            hasError={!!errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </PasswordToggle>
        </PasswordInputWrapper>
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      </FormGroup>

      {error && <ErrorText>{error}</ErrorText>}

      <Button type="submit" disabled={isLoading} fullWidth>
        {isLoading ? <LoadingSpinner /> : 'Sign In'}
      </Button>

      <FormFooter>
        Don't have an account?{' '}
        <FormLink to="/signup">Sign up</FormLink>
      </FormFooter>
    </FormContainer>
  );
};