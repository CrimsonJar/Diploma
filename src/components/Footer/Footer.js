// Footer.js
import React from "react";
import FooterInformation from "./FooterInformation";
import FooterPayment from "./FooterPayment";
import FooterContacts from "./FooterContacts";
import { informationLinks, paymentSystems, socialLinks } from "./footerData";

const Footer = () => {
  return (
    <footer className='container bg-light footer'>
      <div className='row'>
        <div className='col'>
          <FooterInformation links={informationLinks} />
        </div>
        <div className='col'>
          <FooterPayment systems={paymentSystems} />
          <section>
            <div className='footer-copyright'>
              2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
              аксессуаров. Все права защищены.
              <br />
              Доставка по всей России!
            </div>
          </section>
        </div>
        <div className='col text-right'>
          <FooterContacts
            phone='+7 495 79 03 5 03'
            email='office@bosanoga.ru'
            hours='Ежедневно: с 09-00 до 21-00'
            socialLinks={socialLinks}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
