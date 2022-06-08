const NAME = 'products';

export const getProducts = store => store[NAME].list.data;
export const isLoadingProducts = store => store[NAME].list.isLoading;
