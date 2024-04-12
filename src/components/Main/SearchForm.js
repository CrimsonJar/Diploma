// SearchForm.js
import React, { useState, useEffect } from "react";

const SearchForm = ({ query, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (value.length > 1) {
        onSearch(value);
      }
    }, 500); // Задержка, мс

    setTimer(newTimer);
  };

  return (
    <form
      className='catalog-search-form form-inline'
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className='form-control'
        placeholder='Поиск'
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default SearchForm;
