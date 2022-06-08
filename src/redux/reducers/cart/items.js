import Actions from 'actions';

export const getDefaultState = () => [];

function items(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.REPLACE_CART_ITEMS:
      return action.data;
    case Actions.ADD_CART_ITEM:
      return [...state, action.data];
    case Actions.REMOVE_CART_ITEM:
      return state.filter(item => item.id !== action.id);
    case Actions.UPDATE_CART_ITEM: {
      const newData = state.filter(item => item.id !== action.id);
      return [...newData, action.data];
    }
    default:
      return state;
  }
}

export default items;
