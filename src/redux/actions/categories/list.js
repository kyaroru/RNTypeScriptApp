const PREFIX = 'categories';

export const FETCH_CATEGORIES = `${PREFIX}/FETCH_CATEGORIES`;
export const FETCH_CATEGORIES_SUCCESS = `${PREFIX}/FETCH_CATEGORIES_SUCCESS`;
export const FETCH_CATEGORIES_FAIL = `${PREFIX}/FETCH_CATEGORIES_FAIL`;

export const fetchCategories = data => ({
  type: FETCH_CATEGORIES,
  data,
});

export const fetchCategoriesSuccess = data => ({
  type: FETCH_CATEGORIES_SUCCESS,
  data,
});

export const fetchCategoriesFail = error => ({
  type: FETCH_CATEGORIES_FAIL,
  error,
});
