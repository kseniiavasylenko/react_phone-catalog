import { Product } from '../types/Product';

const BASE_URL = import.meta.env.BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
};

export const getProductDetails = async (productId: string) => {
  const response = await fetch(`${BASE_URL}api/products/${productId}.json`);

  if (!response.ok) {
    throw new Error('Failed to load product details');
  }

  return response.json();
};
