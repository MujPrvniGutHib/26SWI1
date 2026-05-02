import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const storedUser = window.localStorage.getItem('swi-auth-user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      // Ignore parse error
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export type ApiBook = {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  age: number;
  pages: number;
  format: string;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  coverUrl: string;
  description: string;
  stock: number;
};

export const fetchBooks = async (): Promise<ApiBook[]> => {
  const response = await api.get('/books');
  return response.data;
};
