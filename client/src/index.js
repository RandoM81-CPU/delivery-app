import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartContextProvider from "./components/cartDishesContext";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <CartContextProvider>
    <App/>
  </CartContextProvider>
);
