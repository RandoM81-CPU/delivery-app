import Header from "../../components/header";
import "./style.scss";
import {useEffect, useState, useContext} from "react";
import api from "../../api/axios/axios";
import Dish from "../../components/dish";
import {CartDishesContext} from "../../components/cartDishesContext";

export default function Shop(){
  const [shops, setShops] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedShop, setSelectedShop] = useState(1);

  useEffect(() => {
    const getAllShops = async () => {
      try{
        const response = await api.get('/api/shop');
        setShops(response.data);
      }catch (e) {
        if (e.response) {
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        }else{
          console.log(`Error ${e.message}`);
        }
      }
    }
    getAllShops();
  }, []);

  useEffect(() => {
    async function getDishesByShop() {
      try {
        const response = await api.get('/api/dish?shopId=' + selectedShop);
        setDishes(response.data);
      }catch (e) {
        if (e.response) {
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        }else{
          console.log(`Error ${e.message}`);
        }
      }
    }

    getDishesByShop();
  }, [selectedShop]);

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="shops">
          <ul>
            <h3>Shops:</h3>
          {
            shops && shops.map((i) =>
            <li key={i.id}>
              <button id={i.id} onClick={(event) =>
                setSelectedShop(event.target.id)}>{i.title}</button>
            </li>
            )
          }
          </ul>
        </div>
        <div className="menu">
          {
            dishes.map((i) => (<Dish key={i.id}
                                     dishId={i.id}
                                     title={i.title}
                                     price={i.price}
                                     img={i.img}
                                     shopId={i.shopId}
            />))
          }
        </div>
      </div>
    </div>
  );
}