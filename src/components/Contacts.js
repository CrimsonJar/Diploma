// Contacts.js
import React from "react";
import SectionWrapper from "./SectionWrapper";
import contactsInfo from "./Info/contactsData";

const Contacts = () => {
  const { address, phone, email } = contactsInfo;

  return (
    <SectionWrapper
      title='Контакты'
      content={
        <>
          <p>{address}</p>
          <h5 className='text-center'>Координаты для связи:</h5>
          <p>
            Телефон: <a href={phone.href}>{phone.number}</a> {phone.description}
          </p>
          <p>
            Email: <a href={email.href}>{email.address}</a>
          </p>
        </>
      }
    />
  );
};

export default Contacts;
