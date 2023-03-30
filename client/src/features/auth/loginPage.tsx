import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../users/usersSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const {error, loading, userInfo} = useAppSelector((state) => state.users)

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();
 
  useEffect(() => {
    if (userInfo) {
      navigate('/me')
    }
  }, [navigate, userInfo])

  const submitForm = (data: any) => {
    dispatch(loginUser(data))
  }

  return (
    <>
      <Container sx={{ mt: 8 }}>
        <Box sx={{ m: "0 auto", width: "50%" }}>
          <Typography component="h1" variant="h1">
            Sign in
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form name="login-form" onSubmit={handleSubmit(submitForm)}>
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
            >
              Sign In
            </Button>
            <Box display="flex" justifyContent="space-evenly">
              <Link href="#" variant="body2" color="secondary">
                Forgot password?
              </Link>
              <Link href="/auth/register" variant="body2" color="secondary">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};
