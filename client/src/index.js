import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import './css/ChatApp.css'
import {LoginForm} from "./components/LoginForm";


ReactDOM.render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>,
  document.getElementById('root')
);

