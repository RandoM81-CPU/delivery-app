import {createContext, useState} from "react";

export const CartDishesContext = createContext({});

const CartContextProvider = (props) => {
  const [cartDishes, setCartDishes] = useState([]);

  return (
    <CartDishesContext.Provider value={{cartDishes, setCartDishes}}>
      {props.children}
    </CartDishesContext.Provider>
  )
}

export default CartContextProvider;