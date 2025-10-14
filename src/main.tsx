import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.tsx'
import { ApiProvider } from './context/ApiContext/index.tsx'
import { AuthProvider } from './context/AuthContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApiProvider>
  </StrictMode>,
)
