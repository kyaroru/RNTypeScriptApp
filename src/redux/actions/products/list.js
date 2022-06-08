const PREFIX = 'products';

export const FETCH_PRODUCTS = `${PREFIX}/FETCH_PRODUCTS`;
export const FETCH_PRODUCTS_SUCCESS = `${PREFIX}/FETCH_PRODUCTS_SUCCESS`;
export const FETCH_PRODUCTS_FAIL = `${PREFIX}/FETCH_PRODUCTS_FAIL`;

export const fetchProducts = data => ({
  type: FETCH_PRODUCTS,
  data,
});

export const fetchProductsSuccess = data => ({
  type: FETCH_PRODUCTS_SUCCESS,
  data,
});

export const fetchProductsFail = error => ({
  type: FETCH_PRODUCTS_FAIL,
  error,
});
