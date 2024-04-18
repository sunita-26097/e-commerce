import { Link } from "react-router-dom";
import s from "./CartButtons.module.scss";

const CartButtons = () => {
  function updateCart() {}

  return (
    <div className={s.buttons}>
      <Link to="/products">Return To Shop</Link>

      <button type="button" onClick={updateCart}>
        Update Cart
      </button>
    </div>
  );
};
export default CartButtons;
