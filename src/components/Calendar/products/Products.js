import React from 'react';
import ProductItem from './Product';

const Products = (props) => {

  const productList = props.businessDetails.products;
  if (props.currentStep !== 4) {
    return null
  }
  if (!productList || productList.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className='p-1'>
      <p className="text-center display-6">Recommended products</p>

      {productList.map((product) => (
        <ProductItem
          key={product.productId}
          product={product}
          addProduct={props.addProduct}
        />
      ))}
    </div>
  );
};

export default Products;
