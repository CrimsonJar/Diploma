// TopSales.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopSales } from "../../Slice/topSalesSlice";
import ProductCard from "./ProductCard";

import AlertModal from "./AlertModal";
import Spinner from "./Spinner";

const TopSales = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.topSales);
  const [showModal, setShowModal] = useState(false);
  const showTopSales = useSelector((state) => state.items.showTopSales);

  useEffect(() => {
    if (showTopSales) {
      dispatch(fetchTopSales());
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      setShowModal(true);
    }
  }, [status]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(fetchTopSales()); // Повторный запрос к API при закрытии модального окна
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <section className='top-sales'>
      <h2 className='text-center'>Хиты продаж!</h2>
      <div className='row'>
        {items.map((product) => (
          <div className='col-4' key={product.id}>
            <ProductCard
              key={product.id}
              img={product.images[0]}
              {...product}
            />
          </div>
        ))}
      </div>
      <AlertModal
        show={showModal}
        type='error'
        message={
          <>
            Ошибка: {error}
            <br />
            Повторная загрузка данных через 5 секунд ...
          </>
        }
        delay={5000}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default TopSales;
