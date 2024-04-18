import { useSelector } from "react-redux";
import AddCoupon from "../../Cart/CartInfo/AddCoupon";
import PaymentCalculation from "./PaymentCalculation";
import PaymentOptionsSelection from "./PaymentOptionsSelection";
import PaymentProducts from "./PaymentProducts";
import s from "./PaymentSection.module.scss";
import { useState } from "react";
import SuccessCheckout from "./SuccessCheckout";

const PaymentSection = () => {
  const { cartProducts } = useSelector((state) => state.products);


  return (
    <>
  
    <section className={s.paymentSection} >
      <PaymentProducts data={cartProducts} />
      <PaymentCalculation />
      <PaymentOptionsSelection />
      <AddCoupon />

      <button type="submit" className={s.submitPaymentButton} >
        Place Order
      </button>
    </section>

    </>
  );
};
export default PaymentSection;
