// FooterPayment.js
import React from "react";

const FooterPayment = ({ systems }) => (
  <section>
    <h5>Принимаем к оплате:</h5>
    <div className='footer-pay'>
      {systems.map((system, index) => (
        <div
          key={index}
          className={`footer-pay-systems footer-pay-systems-${system}`}
        ></div>
      ))}
    </div>
  </section>
);

export default FooterPayment;
