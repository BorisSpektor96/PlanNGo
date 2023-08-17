import React from "react";

import "./summary.css";
const Summary = ({selectedDate,selectedTime,selectedService,selectedProducts,profileInfo,businessDetails,currentStep}) => {
  
  if (currentStep !== 5) {
    return null
  }
  // Calculate the total price of selected products
  const totalProductsPrice = selectedProducts.reduce((acc, product) => {
    return acc + product.price * product.amount;
  }, 0);


  // Calculate the total price with tax
  const totalWithTax =
    parseInt(totalProductsPrice) + parseInt(selectedService.price);
  const totalWithTaxAndPercentage = (totalWithTax * 1.17).toFixed(2);

  return (
    <div className="p-1  " id='summary'>
      <hr />
      <h4 className="text-center">Appointment Summary</h4>
      <hr />
      <div className="d-flex justify-content-sm-between">
        <div className="lh-1 Dp">
          <p>Name: {profileInfo.fullname}</p>
          <p>Email: {profileInfo.email}</p>
          <p>Phone Number: {profileInfo.phoneNumber}</p>
        </div>
        <div className="lh-1 Dp">
          <p>Business: {businessDetails.business_name}</p>
          <p>Email: {businessDetails.email}</p>
          <p>Phone: {businessDetails.phoneNumber}</p>
          <p>Address: {businessDetails.address}</p>
        </div>
      </div>
      <hr />
      <h4 className="text-center">Appointment Details</h4>
      <hr />
      <div className="lh-1 pr-1 pl-1 m-2 d-flex justify-content-sm-between Ap ">
        <p>Date: {selectedDate.toLocaleDateString()}</p>
        <p>Time: {selectedTime}</p>
        <p>Service: {selectedService.name}</p>
        <p className="text-danger">Payment: To be made at the business </p>
      </div>
      <hr />

      {selectedProducts.length > 0 && (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.name}</td>
                  <td>{product.amount}</td>
                  <td>{product.price}$</td>
                </tr>
              ))}
              <tr>
                <td>{selectedService.name}</td>
                <td>1</td>
                <td>{selectedService.price}$</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>1</td>
                <td>17%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td>${totalWithTaxAndPercentage}</td>
              </tr>
            </tfoot>
          </table>
          <div className="Ap">
            <p className="text-danger">
              Your order will be prepared for pickup at the business location on
              the scheduled day of your appointment.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};

export default Summary;
