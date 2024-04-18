import React from 'react';
import s from "./SuccessCheckout.module.scss";
import { useNavigate } from 'react-router-dom';

const SuccessCheckout = ({ isOpen, onClose }) => {
  const navigateTo = useNavigate();
  
  return (
    <>
<div id={s.overlay}></div>
    <div className={s.modal }>
      <div className={s.modalContent}>
        {/* <span className={s.close} onClick={onClose}>&times;</span> */}
        <h2>Thank You for Shopping!</h2>
        <p>We appreciate your business.</p>
        <button onClick={()=>{ navigateTo("/products", { replace: true });}}>Continue Shopping</button>
      </div>
    </div>
    </>
  );
}

export default SuccessCheckout;
