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

export const LoginForm = () => {
  return (
    <>
      <Container sx={{ mt: 8 }}>
        <Box sx={{ m: "0 auto", width: "50%" }}>
          <Typography component="h1" variant="h1">
            Sign in
          </Typography>
          <form>
            <TextField
              color="secondary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              color="secondary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};
