// OrderForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AlertModal from "./AlertModal";
import FormGroup from "./FormGroup";

const OrderForm = ({ onSubmit, cartItems }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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

  return (
    <section className='order'>
      <h2 className='text-center'>Оформить заказ</h2>
      <div className='card' style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className='card-body' onSubmit={handleOrderSubmit}>
          <FormGroup
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
