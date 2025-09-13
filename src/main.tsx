import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';

import { ThemeProvider } from './ThemeProvider.tsx';
import { TodoCatProvider } from './utils/context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoCatProvider>
      <ThemeProvider accentColor="blue" grayColor="gray" scaling="100%" radius="medium" appearance="light">
        <App />
      </ThemeProvider>
    </TodoCatProvider>
  </React.StrictMode>,
);
