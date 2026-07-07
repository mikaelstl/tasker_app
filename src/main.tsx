import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import App from './App.tsx';
import { ApiProvider } from './providers/ApiProvider/index.tsx';
import { AuthProvider } from './providers/AuthProvider/index.tsx';
import { OrganizationProvider } from './providers/OrganizationProvider/index.tsx';
import { ServicesProvider } from './providers/ServicesProvider/index.tsx';
import { Toaster } from '@/components/shadcn-studio/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider>
      <ServicesProvider>
        <OrganizationProvider>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </OrganizationProvider>
      </ServicesProvider>
    </ApiProvider>
  </StrictMode>,
)
