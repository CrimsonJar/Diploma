// navigateMiddleware.js
export const navigateMiddleware = (history) => () => (next) => (action) => {
  if (action.type === 'items/navigateToCategory') {
    const { categoryId } = action.payload;
    history.push(`/catalog/${categoryId}`);
  }

  return next(action);
};