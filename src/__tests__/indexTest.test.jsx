import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

const sampleProducts = [
  { id: 1, name: 'Laptop', price: '$999', inStock: true },
  { id: 2, name: 'Phone', price: '$699', inStock: false },
  { id: 3, name: 'Tablet', price: '$499', inStock: true },
]

test('renders product dashboard title', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /Product Dashboard/i })).toHaveAttribute(
    'id',
    'header',
  )
})

test('displays all products initially', () => {
  render(<App />)

  sampleProducts.forEach((product) => {
    expect(screen.getByText(product.name)).toBeInTheDocument()
  })
  expect(document.getElementById('product-list')).toBeInTheDocument()
  expect(screen.getAllByRole('img')).toHaveLength(sampleProducts.length)
})

test('applies conditional styling for out-of-stock products', () => {
  render(<App />)
  const outOfStockProduct = screen.getByText(/Phone/i) // Make sure "Phone" exists in sampleProducts
  expect(outOfStockProduct.closest('div')).toHaveClass('outOfStockClass')
})

test('filters products by availability', () => {
  render(<App />)

  fireEvent.click(screen.getByRole('button', { name: 'In Stock' }))
  expect(screen.getByText('Laptop')).toBeInTheDocument()
  expect(screen.getByText('Tablet')).toBeInTheDocument()
  expect(screen.queryByText('Phone')).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: 'Out of Stock' }))
  expect(screen.getByText('Phone')).toBeInTheDocument()
  expect(screen.queryByText('Laptop')).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: 'All Products' }))
  sampleProducts.forEach((product) => {
    expect(screen.getByText(product.name)).toBeInTheDocument()
  })
})

test('removes product from the dashboard when "Remove" button is clicked', () => {
  render(<App />)
  fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0])
  expect(screen.queryByRole('heading', { name: 'Laptop' })).not.toBeInTheDocument()
})
