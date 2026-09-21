import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalPrice: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Вспомогательная функция для проверки равенства ID товара с учетом разных полей
const isSameProduct = (product: Product, targetId: string) => {
  return (
    product.id === targetId ||
    product.itemId === targetId ||
    product.phoneId === targetId
  );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse cart from localStorage:', error);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item =>
          isSameProduct(item.product, product.id) ||
          (product.itemId && isSameProduct(item.product, product.itemId)),
      );

      if (existingItem) {
        return prevCart.map(item =>
          isSameProduct(item.product, product.id) ||
          (product.itemId && isSameProduct(item.product, product.itemId))
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart =>
      prevCart.filter(item => !isSameProduct(item.product, productId)),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);

      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        isSameProduct(item.product, productId) ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string) => {
    return cart.some(item => isSameProduct(item.product, productId));
  };

  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice =
      item.product.priceDiscount ??
      item.product.price ??
      item.product.fullPrice ??
      0;

    return sum + itemPrice * item.quantity;
  }, 0);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
