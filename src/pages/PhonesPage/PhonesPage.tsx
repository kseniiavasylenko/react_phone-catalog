import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import styles from './PhonesPage.module.scss';

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Чтение параметров из URL с дефолтными значениями
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // 1. Фильтрация только товаров категории 'phones'
  const phones = useMemo(() => {
    return products.filter(
      product => product.category === 'phones' || !product.category,
    );
  }, [products]);

  // 2. Сортировка отфильтрованных телефонов
  const sortedProducts = useMemo(() => {
    return [...phones].sort((a, b) => {
      switch (sortBy) {
        case 'age':
          return (b.year || 0) - (a.year || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [phones, sortBy]);

  const total = sortedProducts.length;
  const itemsPerPage = perPage === 'all' ? total : Number(perPage) || 16;

  // 3. Расчет срезка для пагинации
  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage, perPage]);

  // Хэндлеры для изменения searchParams в URL
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());
    setSearchParams(params);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.count}>{total} models</p>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort-select" className={styles.label}>
            Sort by
          </label>
          <select
            id="sort-select"
            className={styles.select}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>

          <label htmlFor="per-page-select" className={styles.label}>
            Items on page
          </label>
          <select
            id="per-page-select"
            className={styles.select}
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="16">16</option>
            <option value="8">8</option>
            <option value="4">4</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {perPage !== 'all' && total > itemsPerPage && (
        <Pagination
          total={total}
          perPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
