// Banner.js
import React from "react";
import bannerImage from "../img/banner.jpg";
import "../css/style.css";
const Banner = () => {
  return (
    <div className='banner'>
      <img src={bannerImage} className='img-fluid' alt='К весне готовы!' />
      <h2 className='banner-header'>К весне готовы!</h2>
    </div>
  );
};

export default Banner;
