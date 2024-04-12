// Catalog.js
import React, { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchItems,
  increaseOffset,
  resetItems,
  setShowTopSales,
  setSearchQuery,
} from "../../Slice/itemsSlice";
import CatalogCategories from "./CatalogCategories";
import SearchForm from "./SearchForm";
import ProductsGrid from "./ProductsGrid";
import LoadMoreButton from "./LoadMoreButton";
import Spinner from "./Spinner";

const Catalog = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const {
    items,
    isLoading,
    offset,
    hasMoreItems,
    limit,
    showTopSales,
    searchQuery,
    activeCategoryId,
    isInitialLoadCompleted,
  } = useSelector((state) => state.items);
  useEffect(() => {
    console.log("items", items);
  }, [items]);
  useEffect(() => {
    // уст. showTopSales в false, если находимся на странице каталога
    if (location.pathname === "/catalog") {
      dispatch(setShowTopSales(false));
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const queryFromURL = searchParams.get("search") || "";
    dispatch(setSearchQuery(queryFromURL));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(resetItems());
    dispatch(
      fetchItems({
        categoryId: Number(activeCategoryId) || 0,
        offset: 0,
        query: searchQuery,
      })
    );
  }, [dispatch, activeCategoryId, searchQuery]);

  const handleLoadMore = () => {
    dispatch(increaseOffset());
    dispatch(
      fetchItems({
        categoryId: Number(activeCategoryId) || 0,
        offset: offset + limit,
        query: searchQuery,
      })
    );
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    dispatch(resetItems());
    dispatch(
      fetchItems({
        categoryId: activeCategoryId,
        offset: 0,
        query,
      })
    );
  };

  return (
    <section className='catalog'>
      <h2 className='text-center'>Каталог</h2>
      {!showTopSales && (
        <SearchForm query={searchQuery} onSearch={handleSearch} />
      )}
      <CatalogCategories />
      {isLoading ? (
        <Spinner />
      ) : isInitialLoadCompleted && items.length === 0 ? ( // Проверяем, что начальная загрузка завершена
        <p className='text-center'>
          Товары не найдены. Попробуйте изменить запрос.
        </p>
      ) : (
        <ProductsGrid products={items} />
      )}
      {hasMoreItems && items.length > 0 && (
        <LoadMoreButton
          hasMoreItems={hasMoreItems}
          loadMore={handleLoadMore}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default Catalog;
