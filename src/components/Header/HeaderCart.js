// Cart.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const itemCount = cartItems.reduce((total, item) => total + item.count, 0);

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div
      className='header-controls-pic header-controls-cart'
      onClick={goToCart}
    >
      {itemCount > 0 && (
        <div className='header-controls-cart-full'>{itemCount}</div>
      )}
      <div className='header-controls-cart-menu'></div>
    </div>
  );
};

export default Cart;
