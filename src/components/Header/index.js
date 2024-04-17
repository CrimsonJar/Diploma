// index.js
// header
import React, { useEffect } from "react";
import "../css/style.css";
import headerLogo from "../img/header-logo.png";
import Navigation from "./Navigation";
import Search from "./Search";
import Cart from "./HeaderCart";

const Header = () => {
  return (
    <header className='container'>
      <div className='row'>
        <div className='col'>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <a className='navbar-brand' href='/'>
              <img src={headerLogo} alt='Bosa Noga' />
            </a>
            <Navigation />
            <Search />
            <Cart />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
