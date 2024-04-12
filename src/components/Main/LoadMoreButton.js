// LoadMoreButton.js
import React from "react";

const LoadMoreButton = ({ hasMoreItems, loadMore, isLoading }) => {
  return (
    <div className='text-center'>
      {hasMoreItems && (
        <button
          className='btn btn-outline-primary'
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? "Загружаем..." : "Загрузить ещё"}
        </button>
      )}
    </div>
  );
};

export default LoadMoreButton;
