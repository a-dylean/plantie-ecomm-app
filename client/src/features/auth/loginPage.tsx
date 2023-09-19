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
import { FieldValues, useForm } from 'react-hook-form';
import { Layout } from '../../app/layout';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { isApiResponse } from '../../helpers/errors';
//import { useLoginUserMutation } from '../users/usersApi';
import { routes } from '../../helpers/routes';
import { useSignIn } from './useLogin';
import { FormEventHandler } from 'react';

export const LoginForm = () => {
  const { register } = useForm();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const onSignIn: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email === 'string' && typeof password === 'string') {
      signIn({
        email,
        password,
      });
    }
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
        <form name="login-form" onSubmit={onSignIn}>
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
