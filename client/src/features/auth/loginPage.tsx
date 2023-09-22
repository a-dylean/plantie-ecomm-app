import {
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Layout } from '../../app/layout';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { routes } from '../../helpers/routes';
import { FormEventHandler } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User } from '../../models/api';
import { queryClient } from '../..';
import { loginUser } from '../../helpers/userActions';

export const LoginForm = () => {
  const { register } = useForm();
  const navigate = useNavigate();
  const { mutate: login } = useMutation<
    Partial<User>,
    unknown,
    Partial<User>,
    unknown
  >((data) => loginUser(data), {
    onSuccess: () => queryClient.invalidateQueries(['user']),
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.details, { variant: 'error' });
    },
  });
  const handleSignIn: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const userData = Object.fromEntries(formData);
    login(userData);
  };

  return (
    <Layout>
      <Box sx={{ m: '0 auto', width: '50%' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        />
        <form name="login-form" onSubmit={handleSignIn}>
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate(routes.ME)}
          >
            Sign In
          </Button>
          <Box display="flex" justifyContent="space-evenly" sx={{ mt: 1 }}>
            <Link href="#" variant="body2" color="secondary">
              Forgot password?
            </Link>
            <Link
              onClick={() => navigate(routes.REGISTER)}
              variant="body2"
              color="secondary"
              sx={{ cursor: 'pointer' }}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};
