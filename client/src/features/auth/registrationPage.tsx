import {
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../app/layout';
import {
  MuiTelInput,
  MuiTelInputContinent,
  matchIsValidTel,
} from 'mui-tel-input';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { User } from '../../models/api';
import { FormEventHandler } from 'react';
import { routes } from '../../helpers/routes';
import { updateUser } from '../../helpers/userActions';

export const RegistrationForm = () => {
  const continents: MuiTelInputContinent[] = ['EU'];
  const navigate = useNavigate();
  const { register, control } = useForm();
  const { mutate } = useMutation<User, unknown, Partial<User>, unknown>(
    (data) => updateUser(data),
    {
      onSuccess: () => navigate(routes.ME),
      onError: (error: any) => {
        console.log();
        if (error.response.data.details['requestBody.email']) {
          enqueueSnackbar('This email is already in use', { variant: 'error' });
        } else {
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        }
      },
    },
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const userData = Object.fromEntries(formData);
    userData.email.toString().toLowerCase();
    mutate(userData);
  };

  return (
    <Layout>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      />
      <Box sx={{ m: '0 auto', width: '50%' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign up
        </Typography>
        <form name="registration-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                type="text"
                {...register('name')}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Last Name"
                {...register('surname')}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                {...register('email', {
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register('password')}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="phone"
                control={control}
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    fullWidth
                    color="secondary"
                    forceCallingCode
                    defaultCountry={'FR'}
                    continents={continents}
                    helperText={
                      fieldState.invalid ? 'Phone number is invalid' : ''
                    }
                    error={fieldState.invalid}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                fullWidth
                label="Home address"
                id="address"
                {...register('address')}
              />
            </Grid>
            <Grid xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="secondary"
                    defaultChecked
                    size="small"
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="secondary">
            Sign Up
          </Button>
          <Link href="/" variant="body2">
            Already have an account? Sign in
          </Link>
        </form>
      </Box>
    </Layout>
  );
};
