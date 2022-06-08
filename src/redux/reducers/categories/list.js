import Actions from 'actions';

export const getDefaultState = () => ({
  isLoading: false,
  error: null,
  data: [],
});

function categories(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.FETCH_CATEGORIES:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case Actions.FETCH_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.FETCH_CATEGORIES_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
}

export default categories;
