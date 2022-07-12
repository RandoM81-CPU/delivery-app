import "./style.scss"
import {useContext} from "react";
import {CartDishesContext} from "../cartDishesContext";

export default function Dish({dishId, title, price, img, shopId}){
  const {cartDishes, setCartDishes} = useContext(CartDishesContext);

  const handleClick = () => {
    setCartDishes([...cartDishes, {dishId, title, price, img, shopId}])
  }

  return(
    <div className="dish">
      <img src={`./static/${img}`} alt={title} height="150px" width="230px"/>
      <div className="dish_info">
        <span>
          <h3>{title}</h3>
          <p>{price} uah</p>
        </span>
        <button className="add_button" onClick={handleClick}>Add</button>
      </div>
    </div>
  );
}