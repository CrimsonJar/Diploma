// CatalogCategories.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Slice/categoriesSlice";
import {
  fetchItemsByCategory,
  fetchItems,
  setActiveCategory,
} from "../../Slice/itemsSlice";
import CategoryItem from "./CategoryItem";
import Spinner from "./Spinner";

const CatalogCategories = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.categories);
  const activeCategoryId = useSelector((state) => state.items.activeCategoryId);
  const searchQuery = useSelector((state) => state.items.searchQuery);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Ошибка загрузки категорий.</div>;
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
    </ul>
  );
};

export default CatalogCategories;
