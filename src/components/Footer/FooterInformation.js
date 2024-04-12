// FooterInformation.js
import React from "react";
import { Link } from "react-router-dom";

const FooterInformation = ({ links }) => (
  <section>
    <h5>Информация</h5>
    <ul className='nav flex-column'>
      {links.map((link, index) => (
        <li key={index} className='nav-item'>
          <Link to={link.path} className='nav-link'>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default FooterInformation;
