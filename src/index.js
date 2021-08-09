import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider as ProviderRedux} from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
      <ProviderRedux store={store}>
          <Router>
              <App />
          </Router>
      </ProviderRedux>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
