import React from "react";
import CartItem from "./CartItem";

const Cart = ({ selectedProducts, onIncrease, onDecrease,deleteProductHandler}) => {
  if(selectedProducts.length===0){
    return
  }
  return (
    <section className="pt-1 pb-1">
      <div className="container d-flex p-2 justify-content-center">
        <div className="row ">
          <div className="">
            <table
              id="shoppingCart"
              className="table table-condensed table-responsive"
            >
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Product</th>
                  <th style={{ width: "5%" }}>amount </th>
                  <th style={{ width: "20%" }}>action </th>
                  <th style={{ width: "20%" }}>delete </th>


                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <CartItem
                    key={product.productId}
                    product={product}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    deleteProductHandler={deleteProductHandler}

                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
