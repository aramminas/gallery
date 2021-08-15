import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider as ProviderRedux} from "react-redux";
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
      <ProviderRedux store={store}>
          <ToastProvider autoDismiss autoDismissTimeout={6000} placement="top-right">
              <Router>
                  <App />
              </Router>
          </ToastProvider>
      </ProviderRedux>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
