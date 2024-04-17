// CatalogCategories.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Slice/categoriesSlice";
import { fetchItems, setActiveCategory } from "../../Slice/itemsSlice";
import CategoryItem from "./CategoryItem";
import Spinner from "./Spinner";

const CatalogCategories = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.categories);
  const activeCategoryId = useSelector((state) => state.items.activeCategoryId);
  const searchQuery = useSelector((state) => state.items.searchQuery);
  const [retryCount, setRetryCount] = useState(0);
  const error = useSelector((state) => state.items.error);
  const offset = useSelector((state) => state.items.offset);
  // Обработчик повторного запроса
  const handleRetry = () => {
    dispatch(
      fetchItems({
        categoryId: Number(activeCategoryId) || 0,
        offset: offset,
        query: searchQuery,
      })
    );
  };

  useEffect(() => {
    if (status === "failed" && retryCount < 30) {
      setTimeout(() => {
        dispatch(fetchCategories());
        setRetryCount(retryCount + 1);
      }, 3000);
    }
  }, [status, retryCount, dispatch]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return (
      <div>
        Ошибка загрузки категорий. Повторная попытка загрузки будет через 3
        секунды.
      </div>
    );
  }

  const handleCategoryClick = (categoryId) => {
    dispatch(setActiveCategory(categoryId));
    dispatch(fetchItems({ categoryId, query: searchQuery, offset: 0 }));
  };

  return (
    <ul className='catalog-categories nav justify-content-center'>
      {items.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id}
          title={category.title}
          isActive={activeCategoryId === category.id}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
      {error && (
        <div className='text-center'>
          <p>Произошла ошибка при загрузке товаров: {error}</p>
          <button onClick={handleRetry}>Повторить попытку</button>
        </div>
      )}
    </ul>
  );
};

export default CatalogCategories;
