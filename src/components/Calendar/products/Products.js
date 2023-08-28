import React from 'react';
import ProductItem from './Product';

const Products = ({ productList, currentStep, addProduct, serviceName }) => {
  if (currentStep !== 4 || !productList || productList.length === 0 || serviceName === null) {
    return null;
  }
  // Convert serviceName to lowercase and split it by spaces
  const serviceWords = serviceName.toLowerCase().split(/\s+/);
  let productLabels = null
  // Filter the productList based on the serviceWords
  let filteredProducts = productList.filter((product) => {
    if (product.lables) {
      // Convert product labels to lowercase, remove spaces, and split by commas
      productLabels = product.lables.toLowerCase().replace(/\s+/g, '').split(',');
      // Check if any service word matches any product label
      return serviceWords.some((word) => productLabels.includes(word));
    }
  });

  if (filteredProducts.length === 0) {
    filteredProducts = productList;
  }

  return (
    <div className='p-1'>
      <p className="text-center display-6">Recommended products</p>
      { filteredProducts.map((product) => (
        <ProductItem
          key={ product.productId }
          product={ product }
          addProduct={ addProduct }
        />
      )) }
    </div>
  );
};

export default Products;