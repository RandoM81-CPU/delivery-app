import Header from "../../components/header";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import "./style.scss";
import {CartDishesContext} from "../../components/cartDishesContext";
import api from "../../api/axios/axios";

export default function Cart(){
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const {cartDishes, setCartDishes} = useContext(CartDishesContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = async () => {
    try{
      const {data} = await api.post('/api/order', {totalPrice, name, email, phoneNumber: phone, address});
      return data;
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

  useEffect(()=>{
    const calculateTotalPrice = () => {
      setTotalPrice(cartDishes.reduce((sum, currentDish) => sum + currentDish.price, 0));
    }

    calculateTotalPrice();
  }, [cartDishes]);

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="info">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span>Name:</span>
              <input
                {...register("name", {
                  required: "The field is required",
                })}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
            <div className="error">
              {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
            </div>
            <label>
              <span>Email:</span>
              <input
                {...register("email", {
                  required: "The field is required.",
                  minLength: {
                    value: 10,
                    message: "Enter more than 10 characters."
                  },
                  pattern: /^((([0-9A-Za-z][-0-9A-z.]+[0-9A-Za-z])|([0-9А-Яа-я][-0-9А-я.]+[0-9А-Яа-я]))@([-A-Za-z]+\.){1,2}[-A-Za-z]{2,})$/
                })}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <div className="error">
              {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
            </div>
            <label>
              <span>Phone number:</span>
              <input
                {...register("phoneNumber", {
                  required: "The field is required",
                  minLength: {
                    value: 10,
                    message: "Enter 10 digits."
                  },
                  maxLength: {
                    value: 10,
                    message: "Enter 10 digits."
                  }
                })}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </label>
            <div className="error">
              {errors?.phoneNumber && <p>{errors?.phoneNumber?.message || "Error!"}</p>}
            </div>
            <label>
              <span>Address:</span>
              <input
                {...register("address", {
                  required: "The field is required",
                })}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </label>
            <div className="error">
              {errors?.address && <p>{errors?.address?.message || "Error!"}</p>}
            </div>
          </form>
        </div>
        <div className="order">
          {
            cartDishes? cartDishes.map((i) => (
              <div key={i.id} className="dish">
                <img src={`./static/${i.img}`} alt={i.title} height="150px" width="230px"/>
                <div className="dish_info">
                  <span>
                    <h3>{i.title}</h3>
                    <p>{i.price} uah</p>
                  </span>
                </div>
              </div>
            )): <p>Your cart is empty</p>
          }
        </div>
        <h3>Total price: {totalPrice}</h3>
        <button type="submit" className="submit" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}