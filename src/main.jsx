import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './context/UserContext.jsx';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css'
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
    theme={{
      colors: {
        brand: ["#6b7cff","#bcb8f0","#f0edff","#d0ccf4","#5c5cc4","#6464cc","#6c6cc4","#6b7cff","#4560de","#7181ff"],
      },
      primaryColor: "brand",
      defaultRadius: 'lg',
    }}>
    <UserProvider>
      <App />
    </UserProvider>
    </MantineProvider>
  </StrictMode>
)
