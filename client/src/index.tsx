import ReactDOM from 'react-dom/client';
import { App } from './app/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
);
