// components/NotFound/NotFound.js
import React from "react";
import SectionWrapper from "./SectionWrapper";

const NotFound = () => {
  return (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          <SectionWrapper
            title='Страница не найдена'
            content={
              <div className='text-center'>
                Извините, такая страница не найдена!
              </div>
            }
          />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
