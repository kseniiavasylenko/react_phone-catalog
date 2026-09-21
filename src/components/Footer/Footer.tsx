import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 1. Логотип */}
        <NavLink to="/" className={styles.logoLink}>
          <img
            src={`${import.meta.env.BASE_URL}img/logo.svg`}
            alt="Product Catalog Logo"
            className={styles.logo}
          />
        </NavLink>

        {/* 2. Полезные ссылки */}
        <div className={styles.nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a
            href="#contacts"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Contacts
          </a>
          <a
            href="#rights"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Rights
          </a>
        </div>

        {/* 3. Кнопка Back to top */}
        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/arrow-up.svg`}
              alt="Arrow up"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
