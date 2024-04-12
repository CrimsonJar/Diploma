// FooterContacts.js
import React from "react";

const FooterContacts = ({ phone, email, hours, socialLinks }) => (
  <section className='footer-contacts'>
    <h5>Контакты:</h5>
    <a className='footer-contacts-phone' href={`tel:${phone}`}>
      {phone}
    </a>
    <span className='footer-contacts-working-hours'>{hours}</span>
    <a className='footer-contacts-email' href={`mailto:${email}`}>
      {email}
    </a>
    <div className='footer-social-links'>
      {socialLinks.map((link, index) => (
        <div
          key={index}
          className={`footer-social-link footer-social-link-${link}`}
        ></div>
      ))}
    </div>
  </section>
);

export default FooterContacts;
