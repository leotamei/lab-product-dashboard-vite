import React, { useState } from 'react';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: '$999', inStock: true },
    { id: 2, name: 'Phone', price: '$699', inStock: false },
    { id: 3, name: 'Tablet', price: '$499', inStock: true },
  ]);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    if (availabilityFilter === 'inStock') return product.inStock;
    if (availabilityFilter === 'outOfStock') return !product.inStock;
    return true;
  });

  const removeProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
  };

  return (
    <div>
      <h1 id="header">Product Dashboard</h1>
      <div>
        <button type="button" onClick={() => setAvailabilityFilter('all')}>
          All Products
        </button>
        <button type="button" onClick={() => setAvailabilityFilter('inStock')}>
          In Stock
        </button>
        <button
          type="button"
          onClick={() => setAvailabilityFilter('outOfStock')}
        >
          Out of Stock
        </button>
      </div>
      <ProductList
        products={filteredProducts}
        onRemove={removeProduct}
      />
    </div>
  );
};

export default App;
