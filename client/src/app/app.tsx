import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../components/theme';
import { ProductsContainer } from '../features/products/productsContainerPage';
import { RegistrationForm } from '../features/auth/registrationPage';
import { UserPage } from '../features/users/userPage';
import { ProductPage } from '../features/products/productPage';
import { SuccessfullPayment } from '../features/checkout/successfullPayment';
import { CancelledPayment } from '../features/checkout/cancelledPayment';
import { useRetrieveSession } from '../hooks/useRetrieveSession';
import React, { useEffect } from 'react';
import { routes } from '../helpers/routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useMutation, useQuery } from '@tanstack/react-query';
import { api, securelyGetAccessToken } from '../helpers/refreshToken';
import { User } from '../models/api';

export const App = () => {
  //useRetrieveSession();
  const createNewUser = useMutation({
    mutationFn: async () => {
      const res = await api.post('session/start');
      return res.data;
    },
    onSuccess(data) {
      localStorage.setItem('accessToken', data.accessToken);
    },
  });

  const {
    data,
    error,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      let fetchData;
        const token = await securelyGetAccessToken();
        await api.get<User>('me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then((res) => fetchData = res.data)  
    return fetchData
    },
    notifyOnChangeProps: ['data', 'error']
  });
  
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!token) {
      createNewUser.mutate();
    }
  }, [data, token]);
  return (
    <>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<ProductsContainer />} />
              <Route
                path={routes.ALL_PRODUCTS}
                element={<ProductsContainer />}
              />
              <Route path={routes.PRODUCT_ITEM} element={<ProductPage />} />
              <Route path={routes.REGISTER} element={<RegistrationForm />} />
              <Route path={routes.ME} element={<UserPage data={data} error={error}
    isLoading={isLoading}
    isSuccess={isSuccess}/>} />
              <Route path={routes.SUCCESS} element={<SuccessfullPayment />} />
              <Route path={routes.CANCEL} element={<CancelledPayment />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen />
    </>
  );
};
