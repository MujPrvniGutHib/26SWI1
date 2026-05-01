import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export type ApiBook = {
  id: number;
  title: string;
  author: string;
  price: number;
  // We will map missing fields from backend to default values in frontend for now
};

export const fetchBooks = async (): Promise<ApiBook[]> => {
  const response = await api.get('/books');
  return response.data;
};
