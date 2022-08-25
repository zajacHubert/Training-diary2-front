import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { App } from './App';

const isDev = process.env.NODE_ENV === 'development';
const browser = <BrowserRouter>  </BrowserRouter >;
const hash = <HashRouter> <App /></HashRouter>




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    {isDev ? browser : hash}
    {/* <HashRouter>
      <App />
    </HashRouter> */}
  </>
);


