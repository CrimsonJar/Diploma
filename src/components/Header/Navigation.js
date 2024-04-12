// Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowTopSales } from "../../Slice/itemsSlice";

const navigationLinks = [
  { name: "Главная", path: "/" },
  { name: "Каталог", path: "/catalog" },
  { name: "О магазине", path: "/about" },
  { name: "Контакты", path: "/contacts" },
];

const Navigation = () => {
  const dispatch = useDispatch();

  const handleNavLinkClick = (path) => {
    // состояние showTopSales в зависимости от пути
    if (path === "/catalog") {
      dispatch(setShowTopSales(false));
    } else {
      dispatch(setShowTopSales(true));
    }
  };

  return (
    <div className='collapse navbar-collapse' id='navbarMain'>
      <ul className='navbar-nav mr-auto'>
        {navigationLinks.map((link, index) => (
          <li key={index} className='nav-item'>
            <NavLink
              to={link.path}
              className='nav-link'
              onClick={() => handleNavLinkClick(link.path)}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
