import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.tsx'
import { ApiProvider } from './context/ApiContext/index.tsx'
import { AuthProvider } from './context/AuthContext/index.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider>
      <AuthProvider>
        <App />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          autoClose={4000}
          closeOnClick
        />
      </AuthProvider>
    </ApiProvider>
  </StrictMode>,
)
