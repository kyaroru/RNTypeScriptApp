const NAME = 'dashboard';

export const getProfile = store => store[NAME].profile.data;
export const isLoadingProfile = store => store[NAME].profile.isLoading;
