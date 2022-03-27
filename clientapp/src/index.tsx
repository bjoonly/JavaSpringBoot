import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from "./store"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "cropperjs/dist/cropper.css";
import { Provider } from 'react-redux';
import { AuthUser } from './components/Auth/actions';
import 'react-toastify/dist/ReactToastify.css';
const token = localStorage.token as string;

if (token) {
  AuthUser(token, store.dispatch);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
