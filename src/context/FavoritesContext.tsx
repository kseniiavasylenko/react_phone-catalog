import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// Вспомогательная функция сопоставления ID
const isSameProduct = (product: Product, targetId: string) => {
  return (
    product.id === targetId ||
    product.itemId === targetId ||
    product.phoneId === targetId
  );
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse favorites from localStorage:', error);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(
        item =>
          isSameProduct(item, product.id) ||
          (product.itemId && isSameProduct(item, product.itemId)),
      );

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => !isSameProduct(item, productId)));
  };

  const isFavorite = (productId: string) => {
    return favorites.some(item => isSameProduct(item, productId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
