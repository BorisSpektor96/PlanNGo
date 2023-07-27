import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import style from "./products.module.css";

const Products = (props) => {
  const productList = props.businessDetails.products;

  if (productList == null || productList.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div >
      {productList.map((product) => (
        <div className='  card pb-2'>      

        <div key={product.productId} >
          <img className={style["imgi"] } src={product.photo ? `data:image/jpeg;base64,${product.photo}` : "./logo512.png"}  alt={product.name} />
          <div className={style["card-body"]}>
            <div className={style["text-section"]}>
              <h5 className={style["card-title fw-bold"]}>{product.name}</h5>
              <p className={style["card-text"]}>{product.description}</p>
            </div>
            <div className={style["cta-section"]}>
              <div>${product.price}</div>
              <a href="#" className="btn btn-light">Buy Now</a>
            </div>
          </div>
        </div>   </div>
      ))}
    </div>
  );
};

export default Products;