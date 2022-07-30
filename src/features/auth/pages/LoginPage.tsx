import { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'app/hooks';
import routes from 'routes';

import AuthLayout from '../components/AuthLayout';
import { LoginDTO } from '../types';
import { login } from '../authSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, control } = useForm<LoginDTO>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginDTO) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const res = await dispatch(login(values));
      unwrapResult(res);
      navigate(routes.tickets);
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in">
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
          {errorMessage}
        </Alert>
      )}
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required field',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: 'Password is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button
          disabled={loading}
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/" variant="body2">
              Dont have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
