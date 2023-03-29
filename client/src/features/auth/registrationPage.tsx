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

export const RegistrationForm = () => {
  return (
    <>
      <Container sx={{ mt: 8 }}>
      <Box sx={{m: "0 auto", width: "50%"}}>
        <Typography component="h1" variant="h1" sx={{ mb: 2 }}>
          Sign up
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                color="secondary"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
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
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                fullWidth
                name="phone"
                label="Phone number"
                type="tel"
                id="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                fullWidth
                name="address"
                label="Home address"
                id="address"
                autoComplete="address"
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
