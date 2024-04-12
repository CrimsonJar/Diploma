// CategoryItem.js
import React from "react";
import { NavLink } from "react-router-dom";

const CategoryItem = ({ id, title, isActive, onClick }) => {
  const handleClick = (event) => {
    if (onClick) {
      event.preventDefault();
      onClick(id);
    }
  };

  return (
    <li className='nav-item'>
      <NavLink
        to={id === 0 ? "/catalog" : `/catalog/${id}`}
        className={({ isActive: isNavLinkActive }) =>
          "nav-link" + (isActive ? " active" : "")
        }
        onClick={handleClick}
      >
        {title}
      </NavLink>
    </li>
  );
};
export default CategoryItem;
