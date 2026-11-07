import React from 'react';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, onRemove }) => {
  const className = product.inStock
    ? styles.productCard
    : `${styles.productCard} outOfStockClass`;

  return (
    <div className={className}>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
      <button type="button" onClick={() => onRemove(product.id)}>
        Remove
      </button>
    </div>
  );
};

export default ProductCard;
