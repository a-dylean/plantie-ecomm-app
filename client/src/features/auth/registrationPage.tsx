import {
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Controller,
  useForm,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../app/layout";
import {
  MuiTelInput,
  MuiTelInputContinent,
  matchIsValidTel,
} from "mui-tel-input";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useUpdateUserDetailsMutation } from "../users/usersApi";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm();
  const continents: MuiTelInputContinent[] = ["EU"];
  const [updateUser] = useUpdateUserDetailsMutation();

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    try {
      data.email = data.email.toLowerCase();
      const result = await updateUser(data).unwrap();
      navigate("/me");
    } catch (error: any) {
      enqueueSnackbar(error.data.message, { variant: "error" });
    }
  };
  return (
    <Layout>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      />
      <Box sx={{ m: "0 auto", width: "50%" }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
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
                {...register("name")}
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
                {...register("surname")}
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
                {...register("email")}
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
                {...register("password")}
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
                    defaultCountry={"FR"}
                    continents={continents}
                    helperText={
                      fieldState.invalid ? "Phone number is invalid" : ""
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
                {...register("address")}
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
