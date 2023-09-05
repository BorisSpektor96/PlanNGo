import React from "react";

const CartItem = ({ product, onIncrease, onDecrease, deleteProductHandler }) => {
  return (
    <tr>
      <td data-th="Price">{ product.name }</td>
      <td data-th="Price "> { product.amount }</td>

      <td data-th="action">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-white border-secondary bg-white btn-md "
            onClick={ () => onDecrease(product._id) }
          >
            -
          </button>
          <button
            className="btn btn-white border-secondary bg-white btn-md "
            onClick={ () => onIncrease(product._id) }
          >
            +
          </button>
        </div>

      </td>
      <td className="text-center">
        <button
          className="btn"
          type="button"
          onClick={ () => {
            deleteProductHandler(product);
          } }
        >
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="hover"
            colors="primary:#c71f16,secondary:#000000"
            styles="width:250px;height:250px"
          ></lord-icon>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
