const NAME = 'cart';

export const REPLACE_CART_ITEMS = `${NAME}/REPLACE_CART_ITEMS`;

export const ADD_CART_ITEM = `${NAME}/ADD_CART_ITEM`;
export const UPDATE_CART_ITEM = `${NAME}/UPDATE_CART_ITEM`;
export const REMOVE_CART_ITEM = `${NAME}/REMOVE_CART_ITEM`;

export const replaceCartItems = data => ({
  type: REPLACE_CART_ITEMS,
  data,
});

export const addCartItem = data => ({
  type: ADD_CART_ITEM,
  data,
});

export const updateCartItem = (id, data, oldData) => ({
  type: UPDATE_CART_ITEM,
  id,
  data,
  oldData,
});

export const removeCartItem = (id, data) => ({
  type: REMOVE_CART_ITEM,
  id,
  data,
});
