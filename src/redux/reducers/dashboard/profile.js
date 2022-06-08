import Actions from 'actions';

export const getDefaultState = () => ({
  isLoading: false,
  error: null,
  data: [],
});

function profile(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.FETCH_PROFILE:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case Actions.FETCH_PROFILE_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.FETCH_PROFILE_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
}

export default profile;
