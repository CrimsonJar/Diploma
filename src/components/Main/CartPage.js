// CartPage.js
import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  clearCart,
  submitOrder,
  resetOrderStatus,
} from "../../Slice/cartSlice";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import AlertModal from "./AlertModal";

const cartTableHeaders = [
  { id: 1, label: "#" },
  { id: 2, label: "Название" },
  { id: 3, label: "Размер" },
  { id: 4, label: "Кол-во" },
  { id: 5, label: "Стоимость" },
  { id: 6, label: "Итого" },
  { id: 7, label: "Действия" },
];

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const orderStatus = useSelector((state) => state.cart.orderStatus);

  const handleRemoveItem = (itemId, size) => {
    dispatch(removeItemFromCart({ itemId, size }));
  };
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (orderStatus === "succeeded") {
      setShowModal(true);
    }
  }, [orderStatus]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(resetOrderStatus()); // Сброс статуса заказа при закрытии модального окна
  };
  useEffect(() => {
    let timer;
    if (orderStatus === "succeeded") {
      timer = setTimeout(() => {
        dispatch(resetOrderStatus());
      }, 15000);
    }
    return () => clearTimeout(timer);
  }, [dispatch, orderStatus]);
  const totalCost = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.count, 0),
    [cartItems]
  );

  if (orderStatus === "pending") {
    return <div className='loader'>Обрабатываем заказ...</div>;
  }

  return (
    <>
      <section className='cart'>
        <h2 className='text-center'>Корзина</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              {cartTableHeaders.map((header) => (
                <th key={header.id} scope='col'>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartItem
                key={item.id + item.size}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))}
            <tr>
              <td colSpan='5' className='text-right'>
                Общая стоимость
              </td>
              <td>{totalCost} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <OrderForm onSubmit={submitOrder} cartItems={cartItems} />
      <AlertModal
        show={showModal}
        type='success'
        message='Заказ успешно оформлен!'
        delay={7000}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default CartPage;
