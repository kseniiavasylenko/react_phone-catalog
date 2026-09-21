import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.scss';

// Безопасное формирование пути
const getPath = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base}${cleanPath}`;
};

export const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}>
        <Link to="/" className={styles.logo}>
          <img src={getPath('img/logo.svg')} alt="Nice Gadgets Logo" />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavLinkClass}>
            Accessories
          </NavLink>
        </nav>
      </div>

      <div className={styles.rightContent}>
        <NavLink to="/favorites" className={styles.iconBtn}>
          <img src={getPath('img/icons/favourites.svg')} alt="Favorites" />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>

        <NavLink to="/cart" className={styles.iconBtn}>
          <img src={getPath('img/icons/shopping-bag.svg')} alt="Cart" />
          {cartItemsCount > 0 && (
            <span className={styles.badge}>{cartItemsCount}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
