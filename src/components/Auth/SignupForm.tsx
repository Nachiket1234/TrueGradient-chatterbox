import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { signupUser, clearError } from '@/store/slices/authSlice';
import { SignupCredentials } from '@/types';
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

export const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupCredentials>();

  const password = watch('password');

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data: SignupCredentials) => {
    dispatch(signupUser(data));
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username can only contain letters, numbers, and underscores',
            },
          })}
        />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          hasError={!!errors.email}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
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
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
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

      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInputWrapper>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            hasError={!!errors.confirmPassword}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </PasswordToggle>
        </PasswordInputWrapper>
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
      </FormGroup>

      {error && <ErrorText>{error}</ErrorText>}

      <Button type="submit" disabled={isLoading} fullWidth>
        {isLoading ? <LoadingSpinner /> : 'Create Account'}
      </Button>

      <FormFooter>
        Already have an account?{' '}
        <FormLink to="/login">Sign in</FormLink>
      </FormFooter>
    </FormContainer>
  );
};