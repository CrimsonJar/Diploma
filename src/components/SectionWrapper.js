// SectionWrapper.js
import React from "react";

const SectionWrapper = ({
  title,
  content,
  specialTitle,
  specialContent,
  children,
  className,
}) => {
  return (
    <section className={className || "top-sales"}>
      <h2 className='text-center'>{title}</h2>
      {content}
      {specialTitle && <p className='h4 text-center'>{specialTitle}</p>}
      {specialContent}
      {children}
    </section>
  );
};

export default SectionWrapper;
