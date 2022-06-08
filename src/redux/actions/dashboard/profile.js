const PREFIX = 'dashboard';

export const FETCH_PROFILE = `${PREFIX}/FETCH_PROFILE`;
export const FETCH_PROFILE_SUCCESS = `${PREFIX}/FETCH_PROFILE_SUCCESS`;
export const FETCH_PROFILE_FAIL = `${PREFIX}/FETCH_PROFILE_FAIL`;

export const fetchProfile = data => ({
  type: FETCH_PROFILE,
  data,
});

export const fetchProfileSuccess = data => ({
  type: FETCH_PROFILE_SUCCESS,
  data,
});

export const fetchProfileFail = error => ({
  type: FETCH_PROFILE_FAIL,
  error,
});
