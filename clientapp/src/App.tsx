import * as React from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';

import './App.css';
import routes from './rotes';

function App() {
  let element = useRoutes(routes);
  return (
    <>
      {element}
    </>
  );
}

export default App;
