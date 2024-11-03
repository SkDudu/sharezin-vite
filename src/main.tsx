import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { CookiesProvider } from 'react-cookie'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <CookiesProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000
          }}
        />
        <App />
      </CookiesProvider>
    </StrictMode>
  </>
)
