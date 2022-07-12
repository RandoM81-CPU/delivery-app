import {Link} from "react-router-dom";
import "./style.scss";
import {CART_ROUTE, SHOP_ROUTE} from "../../consts";

export default function Header(){
  return (
    <header className="header">
      <ul>
        <li><Link to={SHOP_ROUTE}>Shop</Link></li>
        <li className="border-left"><Link to={CART_ROUTE}>Shopping cart</Link></li>
      </ul>
    </header>
  );
}