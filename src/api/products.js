import client from './client';

export default {
  getProducts(page = 1) {
    const endpoint = `products?page=${page}&limit=10`;
    return client.get(endpoint);
  },
};
