// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ img, title, price, id, className = "" }) => {
  return (
    <div className={`card ${className}`.trim()}>
      <img src={img} className='card-img-top img-fluid' alt={title} />
      <div className='card-body'>
        <p className='card-text'>{title}</p>
        <p className='card-text'>{price} руб.</p>
        <Link to={`/catalog/${id}.html`} className='btn btn-outline-primary'>
          Заказать
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
