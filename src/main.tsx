import { Toaster } from '@/components/ui/toaster';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
