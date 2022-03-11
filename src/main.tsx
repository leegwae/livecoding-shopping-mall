import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { worker } from './mocks/browser';

// https://mswjs.io/docs/getting-started/integrate/browser#start-worker
// https://vitejs.dev/guide/env-and-mode.html#env-variables
if (import.meta.env.DEV) {
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
