// OrderForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitOrder, resetOrderStatus } from "../../Slice/cartSlice";
import AlertModal from "./AlertModal";
import FormGroup from "./FormGroup";

const OrderForm = ({ onSubmit, cartItems }) => {
  const dispatch = useDispatch();
  const orderStatus = useSelector((state) => state.cart.orderStatus);
  const orderError = useSelector((state) => state.cart.orderError);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (orderStatus === "failed") {
      // Показываем модальное окно с ошибкой
      setModalContent(orderError || "Произошла ошибка при оформлении заказа.");
      setShowModal(true);
      // Повторяем запрос через 3 секунды
      const timer = setTimeout(() => {
        dispatch(resetOrderStatus()); // Сбрасываем статус заказа перед повторной попыткой
        handleSubmit();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderStatus, orderError, dispatch]);
  const handleSubmit = () => {
    const orderData = {
      owner: { phone, address },
      items: cartItems,
    };
    dispatch(submitOrder(orderData));
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    const phone = event.target.phone.value;
    const address = event.target.address.value;
    const agreement = event.target.agreement.checked;

    if (agreement) {
      const orderData = {
        owner: { phone, address },
        items: cartItems,
      };

      dispatch(onSubmit(orderData));
    } else {
      setModalContent("Пожалуйста, согласитесь с правилами доставки.");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const validatePhone = (value) => {
    // Разрешаем ввод только цифр
    return value.replace(/[^0-9]/g, "");
  };

  const validateAddress = (value) => {
    // Разрешаем ввод букв и цифр кириллицы, а также пробелов и знаков пунктуации
    return value.replace(/[^а-яА-Я0-9\s.,-]/g, "");
  };

  const handlePhoneChange = (e) => {
    const validatedPhone = validatePhone(e.target.value);
    setPhone(validatedPhone);
  };

  const handleAddressChange = (e) => {
    const validatedAddress = validateAddress(e.target.value);
    setAddress(validatedAddress);
  };

  return (
    <section className='order'>
      <h2 className='text-center'>Оформить заказ</h2>
      <div
        className='card order-card'
        style={{ maxWidth: "30rem", margin: "0 auto" }}
      >
        <form className='card-body' onSubmit={handleOrderSubmit}>
          {/* <FormGroup
            label='Телефон'
            id='phone'
            placeholder='Ваш телефон'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormGroup
            label='Адрес доставки'
            id='address'
            placeholder='Адрес доставки'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /> */}
          <FormGroup
            label='Телефон'
            id='phone'
            placeholder='Ваш телефон'
            value={phone}
            onChange={handlePhoneChange}
          />
          <FormGroup
            label='Адрес доставки'
            id='address'
            placeholder='Адрес доставки'
            value={address}
            onChange={handleAddressChange}
          />
          <div className='form-group form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='agreement'
            />

            <label className='form-check-label' htmlFor='agreement'>
              Согласен с правилами доставки
            </label>
          </div>

          <button type='submit' className='btn btn-outline-secondary'>
            Оформить
          </button>
        </form>
      </div>
      <AlertModal
        show={showModal}
        type='error'
        delay={3000}
        message={modalContent}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default OrderForm;
