const NAME = 'categories';

export const getCategories = store => store[NAME].list.data;
export const isLoadingCategories = store => store[NAME].list.isLoading;
