import {
  Store,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice';
import { baseApi } from '../features/api/baseApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { createNewSession } from '../hooks/useRetrieveSession';

const refreshTokenErrorListener = createListenerMiddleware();
refreshTokenErrorListener.startListening({
  predicate: () => true,
  effect: async (action: any, listenerApi) => {
    if (isRejectedWithValue(action) && action?.payload?.status == 403) {
      listenerApi.unsubscribe();
      const newUserQuery = listenerApi.dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        baseApi.endpoints.createNewUser.initiate(),
      );
      await createNewSession(newUserQuery);
    }
  },
});

export const store: Store = configureStore({
  reducer: {
    products: productsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .prepend(refreshTokenErrorListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
