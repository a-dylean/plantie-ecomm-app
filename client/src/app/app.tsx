import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import {
  Container,
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import { Topbar } from "../components/toolbar";
import { theme } from "../components/theme";
import { ProductsContainer } from "../features/products/productsContainerPage";
import { RegistrationForm } from "../features/auth/registrationPage";
import { LoginForm } from "../features/auth/loginPage";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="products/all" element={<ProductsContainer/>}/>
            <Route path="auth/register" element={<RegistrationForm/>}/>
            <Route path="auth/login" element={<LoginForm/>}/>
          </Routes>
          <Topbar/>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
