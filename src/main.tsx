import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import App from './App.tsx';
import { ApiProvider } from './providers/ApiProvider/index.tsx';
import { AuthProvider } from './providers/AuthProvider/index.tsx';
import { ToastContainer } from 'react-toastify';
import { OrganizationProvider } from './providers/OrganizationProvider/index.tsx';
import { ServicesProvider } from './providers/ServicesProvider/index.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider>
      <ServicesProvider>
        <OrganizationProvider>
          <AuthProvider>
            <App />
            <Toaster position='bottom-right'/>
            {/* <ToastContainer
              position="bottom-right"
              hideProgressBar={true}
              autoClose={4000}
              closeOnClick
            /> */}
          </AuthProvider>
        </OrganizationProvider>
      </ServicesProvider>
    </ApiProvider>
  </StrictMode>,
)
