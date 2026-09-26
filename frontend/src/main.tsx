import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Toaster } from 'sonner';
import './index.css';
import App from './App.tsx';

import { THEME } from '@/constants/theme.ts';
import { ThemeProvider } from '@/providers/ThemeProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ThemeProvider defaultTheme={THEME.SYSTEM}>
          <App />
        </ThemeProvider>
      </NuqsAdapter>
      <Toaster
        position="top-center"
        expand={true}
        duration={5000}
        richColors
        closeButton
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
