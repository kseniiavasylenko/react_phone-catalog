import { Product } from '../types/Product';
import { ProductDetail } from '../types/ProductDetails';

const BASE_URL = '/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetail> => {
  const response = await fetch(`${BASE_URL}/products/${productId}.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }

  return response.json();
};
