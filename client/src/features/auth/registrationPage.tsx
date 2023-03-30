import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserModel } from "../../app/interfaces";
import { addUser } from "../users/usersSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "os";
export const RegistrationForm = () => {

  const { loading, userInfo, error, success } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/auth/login')
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/me')
  }, [navigate, userInfo, success])

  const submitForm = (data: any) => {
    data.email = data.email.toLowerCase();
    dispatch(addUser(data))
  }
  return (
    <>
      <Container sx={{ mt: 8 }}>
      <Box sx={{m: "0 auto", width: "50%"}}>
        <Typography component="h1" variant="h1" sx={{ mb: 2 }}>
          Sign up
        </Typography>
        <form name="registration-form" onSubmit={handleSubmit(submitForm)}>
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
                {...register('email')}
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
              <TextField
                color="secondary"
                variant="outlined"
                fullWidth
                label="Phone number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                type="tel"
                helperText="Insert your number starting with country code, without any additional symbols. Ex.: 3307485601"
                id="phone"
                {...register('phone')}
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
                  <Checkbox value="allowExtraEmails" color="secondary" defaultChecked size="small"/>
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
      </Container>
    </>
  );
};
