import * as React from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import routes from './rotes';

function App() {

  let element = useRoutes(routes);
  return (
    <>
      <>
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme='colored' /></>
      {element}
    </>
  );
}

export default App;
