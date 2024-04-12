// FormGroup.js
import React from "react";

const FormGroup = ({
  label,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
}) => (
  <div className='form-group'>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      className='form-control'
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FormGroup;
