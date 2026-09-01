import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/services/products';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hotPrices = products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNew = [...products].sort((a, b) => b.year - a.year);

  const phonesCount = products.filter(
    item => item.category === 'phones',
  ).length;

  const tabletsCount = products.filter(
    item => item.category === 'tablets',
  ).length;

  const accessoriesCount = products.filter(
    item => item.category === 'accessories',
  ).length;

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Catalog</h1>

      <section className={styles.banner}>
        <div className={styles.bannerSlide}>
          <img
            src="/img/banner-phones.png"
            alt="Banner"
            className={styles.bannerImg}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Hot prices</h2>
        <div className={styles.slider}>
          {hotPrices.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shop by category</h2>
        <div className={styles.categories}>
          <Link to="/phones" className={styles.categoryCard}>
            <div className={`${styles.categoryImg} ${styles.phonesBg}`} />
            <h3 className={styles.categoryTitle}>Mobile phones</h3>
            <span className={styles.categoryCount}>
              {`${phonesCount} models`}
            </span>
          </Link>

          <Link to="/tablets" className={styles.categoryCard}>
            <div className={`${styles.categoryImg} ${styles.tabletsBg}`} />
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <span className={styles.categoryCount}>
              {`${tabletsCount} models`}
            </span>
          </Link>

          <Link to="/accessories" className={styles.categoryCard}>
            <div className={`${styles.categoryImg} ${styles.accessoriesBg}`} />
            <h3 className={styles.categoryTitle}>Accessories</h3>
            <span className={styles.categoryCount}>
              {`${accessoriesCount} models`}
            </span>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Brand new models</h2>
        <div className={styles.slider}>
          {brandNew.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
