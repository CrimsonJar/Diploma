// CartItem.js
import React from "react";

const CartItem = ({ item, onRemove }) => {
  const { id, title, size, count, price } = item;
  const totalPrice = price * count;

  return (
    <tr>
      <th scope='row'>{id}</th>
      <td>
        <a href={`/products/${id}.html`}>{title}</a>
      </td>
      <td>{size}</td>
      <td>{count}</td>
      <td>{price} руб.</td>
      <td>{totalPrice} руб.</td>
      <td>
        <button
          className='btn btn-outline-danger btn-sm'
          onClick={() => onRemove(id, size)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default React.memo(CartItem);
