import { Link } from "react-router-dom";
import s from "./FirstHeader.module.scss";
import LanguageSelector from "./LanguageSelector";

const FirstHeader = () => {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.space} />

        <div className={s.headerContent}>
          <p className={s.discount}>
            <span>
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </span>
            <Link to="/products">ShopNow</Link>
          </p>

          {/* <LanguageSelector /> */}
        </div>
      </div>
    </div>
  );
};

export default FirstHeader;
