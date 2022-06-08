import Actions from 'actions';

export const getDefaultState = () => ({
  isLoading: false,
  error: null,
  data: [],
});

function products(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        isLoading: true,
        error: null,
        data: [],
      };
    case Actions.FETCH_PRODUCTS_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.FETCH_PRODUCTS_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
}

export default products;
