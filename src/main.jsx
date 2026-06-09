import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Initialize a query client for seamless server state management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache to prevent excessive refetching
      retry: 2,                 // Standardize retry logic for flaky networks
      refetchOnWindowFocus: false, // Prevent UI jitter on tab switching
    },
  },
});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
 <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);