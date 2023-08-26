import React from "react";
import style from "./products.module.css";

// Custom hook to handle expanded state
const useExpandedState = (initialState = false) => {
  const [ expanded, setExpanded ] = React.useState(initialState);

  const toggleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return [ expanded, toggleExpand ];
};

const ProductItem = ({ product, addProduct }) => {
  const [ expanded, toggleExpand ] = useExpandedState();

  return (
    <div
      className="d-flex border  rounded mb-3 shadow-sm p-1 mb-5 bg-white rounded"
      key={ product.productId }
    >
      <img
        className={ style[ "imgi" ] }
        src={
          product.photo
            ? `data:image/jpeg;base64,${product.photo}`
            : "./logo512.png"
        }
        alt={ product.name }
      />
      <div className={ style[ "card-body" ] }>
        <div className={ style[ "text-section" ] }>
          <h5 className={ style[ "card-title fw-bold" ] }>{ product.name }</h5>
          <p className={ style[ "card-text" ] }>
            { expanded ? (
              product.description
            ) : (
              <>
                { product.description.slice(0, 90) }
                { product.description.length > 90 && "... " }
              </>
            ) }
            { product.description.length > 100 && (
              <button href="#" className="btn btn-link" onClick={ toggleExpand }>
                { expanded ? "Read less" : "Read more" }
              </button>
            ) }
          </p>
        </div>
        <div className={ style[ "cta-section" ] }>
          <div>${ product.price }</div>

          { product.quantity > 0 ? (<button
            href="#"
            className="btn btn-outline-primary"
            onClick={ () => addProduct(product) }
          >
            Add
          </button>) :
            <p style={ {
              fontSize: "12px",
              padding: "3px",
              color: "red",
            } }> sold out</p> }
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
