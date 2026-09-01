import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </BrowserRouter>,
);
