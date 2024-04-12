// Search.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../Slice/itemsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(""); // Локальное состояние для управления вводом

  const toggleSearch = () => {
    if (!searchVisible) {
      setSearchVisible(true); // Делаем форму видимой, если она была скрыта
    } else if (searchVisible && localSearchQuery) {
      dispatch(setSearchQuery(localSearchQuery)); // Обновляем Redux store, если есть запрос
      navigate(`/catalog?search=${encodeURIComponent(localSearchQuery)}`);
    } else {
      setSearchVisible(false); // Скрываем форму, если она была видима и запрос пустой
    }
  };

  const onSearchChange = (event) => {
    setLocalSearchQuery(event.target.value); // Обновляем локальный поисковый запрос
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if (localSearchQuery) {
      dispatch(setSearchQuery(localSearchQuery)); // Обновляем searchQuery в Redux store при отправке формы
      navigate(`/catalog?search=${encodeURIComponent(localSearchQuery)}`);
    }
  };

  return (
    <div>
      <div
        data-id='search-expander'
        className='header-controls-pic header-controls-search'
        onClick={toggleSearch}
      ></div>
      {searchVisible && (
        <form
          data-id='search-form'
          className='header-controls-search-form form-inline'
          onSubmit={onSearchSubmit}
        >
          <input
            className='form-control'
            placeholder='Поиск'
            value={localSearchQuery}
            onChange={onSearchChange}
          />
        </form>
      )}
    </div>
  );
};

export default Search;
