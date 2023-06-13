import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../components/theme';
import { ProductsContainer } from '../features/products/productsContainerPage';
import { RegistrationForm } from '../features/auth/registrationPage';
import { LoginForm } from '../features/auth/loginPage';
import { UserPage } from '../features/users/userPage';
import { ProductPage } from '../features/products/productPage';
import { SuccessfullPayment } from '../features/checkout/successfullPayment';
import { CancelledPayment } from '../features/checkout/cancelledPayment';
import { useRetrieveSession } from '../hooks/useRetrieveSession';
import React from 'react';

export const App: React.FC = () => {
  useRetrieveSession(); 
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<ProductsContainer />} />
            <Route path="products/all" element={<ProductsContainer />} />
            <Route path="products/:productId" element={<ProductPage />} />
            <Route path="auth/register" element={<RegistrationForm />} />
            <Route path="auth/login" element={<LoginForm />} />
            <Route path="me" element={<UserPage />} />
            <Route path="successfull" element={<SuccessfullPayment />} />
            <Route path="cancelled" element={<CancelledPayment />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
