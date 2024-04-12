// ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../Slice/productSlice";
import { addItemToCart } from "../../Slice/cartSlice";
import Spinner from "./Spinner";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);
  console.log("product", product);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setcount] = useState(1);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handlecountChange = (change) => {
    setcount((prevcount) => {
      let newcount = prevcount + change;
      return newcount < 1 ? 1 : newcount > 10 ? 10 : newcount;
    });
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const itemToAdd = {
        id: product.id,
        title: product.title,
        size: selectedSize,
        count,
        price: product.price,
      };
      dispatch(addItemToCart(itemToAdd));
      navigate("/cart");
    } else {
      alert("Пожалуйста, выберите размер перед добавлением в корзину.");
    }
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  const productDetails = [
    { label: "Артикул", value: product.sku },
    { label: "Производитель", value: product.manufacturer },
    { label: "Цвет", value: product.color },
    { label: "Материалы", value: product.material },
    { label: "Сезон", value: product.season },
    { label: "Повод", value: product.reason },
    product.heelSize && { label: "Размер каблука", value: product.heelSize },
  ].filter(Boolean);
  return (
    <section className='catalog-item'>
      <h2 className='text-center'>{product.title}</h2>
      <div className='row'>
        <div className='col-5'>
          <img
            src={product.images?.[0]}
            className='img-fluid'
            alt={product.title}
          />
        </div>
        <div className='col-7'>
          <table className='table table-bordered'>
            <tbody>
              {productDetails.map((detail) => (
                <tr key={detail.label}>
                  <td>{detail.label}</td>
                  <td>{detail.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='text-center'>
            <p>
              Размеры в наличии:
              {product.sizes
                .filter((size) => size.available)
                .map((size) => (
                  <span
                    key={size.size}
                    className={`catalog-item-size ${
                      selectedSize === size.size ? "selected" : ""
                    }`}
                    onClick={() => handleSizeSelect(size.size)}
                  >
                    {size.size}
                  </span>
                ))}
            </p>
            {product.sizes.some((size) => size.available) && (
              <p>
                Количество:
                <span className='btn-group btn-group-sm pl-2'>
                  <button
                    className='btn btn-secondary'
                    onClick={() => handlecountChange(-1)}
                  >
                    -
                  </button>
                  <span className='btn btn-outline-primary'>{count}</span>
                  <button
                    className='btn btn-secondary'
                    onClick={() => handlecountChange(1)}
                  >
                    +
                  </button>
                </span>
              </p>
            )}
          </div>
          {product.sizes.some((size) => size.available) && (
            <button
              className='btn btn-danger btn-block btn-lg'
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
