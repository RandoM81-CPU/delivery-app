import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import React from "react";
import {CART_ROUTE, SHOP_ROUTE} from "./consts";
import Shop from "./pages/shop";
import Cart from "./pages/cart";


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop/>} exact/>
        <Route path={CART_ROUTE} element={<Cart/>}/>
        <Route path={SHOP_ROUTE} element={<Shop/>}/>
        <Route path='*' render={() =>
          (
            <Navigate to={SHOP_ROUTE} replace={true}/>
          )
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
