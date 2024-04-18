import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToArray, removeByKeyName } from "src/Features/productsSlice";
import { isItemFound } from "src/Functions/helper";
import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
import ToolTip from "../../Shared/MiniComponents/ToolTip";
import s from "./ProductDealingControls.module.scss";

const ProductDealingControls = ({ data }) => {
  const { favoritesProducts } = useSelector((state) => state.products);
  const { loginInfo } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const isFavoriteProduct =
    favoritesProducts.filter((product) => product.shortName === data.shortName)
      .length !== 0;

  function increaseQuantity() {
    setQuantity((prevNumber) => +prevNumber + 1);
  }

  function decreaseQuantity() {
    setQuantity((prevNumber) => +prevNumber - 1);
  }

  function handleBuyProduct() {
    if (!loginInfo.isSignIn) navigateTo("/signup");
    else addToCart()
  }

  function addToCart() {
    const addAction = addToArray({ key: "cartProducts", value: data });
    dispatch(addAction);
    setIconName("trashCan");
  }
  function addProductToFavorite() {
    const isProductAlreadyExist = isItemFound(
      favoritesProducts,
      data,
      "shortName"
    );

    if (!loginInfo.isSignIn) navigateTo("/signup");
    if (isProductAlreadyExist) {
      dispatch(
        removeByKeyName({
          dataKey: "favoritesProducts",
          itemKey: "shortName",
          keyValue: data.shortName,
        })
      );
      return;
    }

    dispatch(addToArray({ key: "favoritesProducts", value: data }));
  }

  return (
    <section className={s.dealing}>
      <div className={s.customNumberInput}>
        <button onClick={decreaseQuantity} type="button">
          <label htmlFor="quantity-input">-</label>
        </button>

        <input
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          min={1}
          max={1000}
          id="quantity-input"
        />

        <button onClick={increaseQuantity} type="button">
          <label htmlFor="quantity-input">+</label>
        </button>
      </div>

      <div className={s.wrapper}>
        <button
          type="button"
          className={s.buyButton}
          onClick={handleBuyProduct}
        >
          Buy Now
        </button>

        <button
          type="button"
          className={`${s.addToFav} ${isFavoriteProduct ? s.active : ""}`}
          aria-label="Add to favorite"
          onClick={addProductToFavorite}
        >
          <div className={s.heartBackground} />
          <SvgIcon name="heart" />
          <ToolTip left="50%" top="60px" content="Add to favorite" />
        </button>
      </div>
    </section>
  );
};
export default ProductDealingControls;
