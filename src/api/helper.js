import axios from 'axios';

const fetchUrl = (method, endpoint, params = {}) => {
  if (method === 'get') {
    return axios({
      method,
      params,
      url: endpoint,
    });
  }
  return axios({
    method,
    data: params,
    url: endpoint,
  });
};

const api = {
  get(endpoint, params) {
    return fetchUrl('get', endpoint, params);
  },
  post(endpoint, params) {
    return fetchUrl('post', endpoint, params);
  },
  put(endpoint, params) {
    return fetchUrl('put', endpoint, params);
  },
  patch(endpoint, params) {
    return fetchUrl('patch', endpoint, params);
  },
  delete(endpoint, params) {
    return fetchUrl('delete', endpoint, params);
  },
};

export default api;
