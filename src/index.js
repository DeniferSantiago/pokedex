import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import { Theme } from './Helpers/Theme';
import Amplify from "aws-amplify";
import awsmobile from './aws-exports';
import { Provider } from 'react-redux';
import { store } from "./store";
Amplify.configure(awsmobile);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);