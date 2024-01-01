import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './context/redux/store.ts';

import './scss/style.scss';
import { ThemeProvider } from './components/ui/ThemeProvider/ThemeProfider.tsx';
// import { Toaster } from 'sonner';
import { Toaster, TooltipProvider } from './components/ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider delayDuration={0}>
            <Toaster />
            <App />
          </TooltipProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
