import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../components/theme";
import { ProductsContainer } from "../features/products/productsContainerPage";
import { RegistrationForm } from "../features/auth/registrationPage";
import { LoginForm } from "../features/auth/loginPage";
import { ProfilePage } from "../features/users/profilePage";
import { ProductPage } from "../features/products/productPage";
// import { StripeForm } from "../features/checkout/stripe";
import { useCreateNewUserMutation } from "../features/users/usersApi";
import { useEffect } from "react";
import { SuccessfullPayment } from "../features/checkout/successfullPayment";
import { CancelledPayment } from "../features/checkout/cancelledPayment";

export const App = () => {
  const token = localStorage.getItem("accessToken");
  const [startSession] = useCreateNewUserMutation();
  const createNewUser = async () => {
    const result = await startSession().unwrap();
    localStorage.setItem("accessToken", result.accessToken);
  };
  useEffect(() => {
    if (!token) {
      createNewUser();
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="products/all" element={<ProductsContainer />} />
            <Route path="products/:productId" element={<ProductPage />} />
            <Route path="auth/register" element={<RegistrationForm />} />
            <Route path="auth/login" element={<LoginForm />} />
            <Route path="me" element={<ProfilePage />} />
            {/* <Route path="checkout" element={<StripeForm/>}/> */}
            <Route path="successfull" element={<SuccessfullPayment />} />
            <Route path="cancelled" element={<CancelledPayment />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
