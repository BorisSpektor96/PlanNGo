import React, { useState, useEffect } from "react";
import { Input, Label } from "reactstrap";

const Products = (props) => {
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ enteredDescription, setEnteredDescription ] = useState("");
  const [ enteredName, setEnteredName ] = useState("");
  const [ enterLables, setEnteredLables ] = useState("");
  const [ enteredQuantity, setEnteredQuantity ] = useState(1);
  const [ enteredPrice, setEnteredPrice ] = useState("");

  let [ productId, setProductId ] = useState(1);
  useEffect(() => { }, [ selectedImage ]);

  const addProductHandler = (event) => {
    event.preventDefault(); // Prevents the page from refreshing

    // Check form validation using the every method
    const formIsValid = Object.values(inputs).every(
      (input) => input.errorMessage === ""
    );

    // If the form is not valid, log a message and return
    if (!formIsValid) {
      console.log("Form has errors. Product not added.");
      return;
    }
    setProductId(productId + 1);
    props.handleProducts(
      productId,
      enteredPrice,
      enteredDescription,
      enteredName,
      enteredQuantity,
      enterLables,
      selectedImage
    );
    setEnteredPrice("");
    setEnteredDescription("");
    setEnteredLables("");
    setEnteredQuantity(1);
    setEnteredName("");
  };

  if (props.currentStep !== 4) {
    return null;
  }
  const inputs = [
    {
      id: "product_name",
      label: "Product Name",
      placeholder: "Enter Product Name",
      value: enteredName,
      type: "text",
      onChange: (event) => setEnteredName(event.target.value),
      errorMessage:
        enteredName.trim() === "" ? "Please enter Product Name" : "",
      pattern: "^[a-zA-Z0-9 ]+$",
      required: true,
    },
    {
      id: "product_price",
      label: "Product Price",
      placeholder: "Enter Product Price",
      type: "number",
      value: enteredPrice,
      onChange: (event) => setEnteredPrice(event.target.value),
      errorMessage: enteredPrice.trim() === "" ? "Please enter the price" : "",
      pattern: "must be a number",
      required: true,
    },
    {
      id: "product_quantity",
      label: "Product Quantity",
      placeholder: "Enter Product Quantity",
      type: "number",
      value: enteredQuantity,
      onChange: (event) => setEnteredQuantity(event.target.value),
      errorMessage: isNaN(enteredQuantity) ? "Quantity must be a number" : "",
      pattern: "^\\d+$",
      required: true,
    },
    {
      id: "product_description",
      label: "Product Description",
      placeholder: "Enter Product Description",
      type: "text",
      value: enteredDescription,
      onChange: (event) => setEnteredDescription(event.target.value),
      errorMessage:
        enteredDescription.trim() === ""
          ? "Please enter product description"
          : "",
    },
    {
      id: "product_Lable",
      label: "Product labels",
      placeholder: "Enter Product labels",
      value: enterLables,
      onChange: (event) => setEnteredLables(event.target.value),
      errorMessage:
        enterLables.trim() === ""
          ? "Please enter products labels (separated by commas)"
          : "",
    },
  ];

  return (
    <>
      <p className="text-center display-6">Products</p>
      <form className="form-check p-0">
        { inputs.map((input) => (
          <div key={ input.id }>
            <Label className="mt-2 mb-0" for={ input.id }>
              { input.label }
            </Label>
            <Input
              type={ input.type }
              name={ input.id }
              id={ input.id }
              placeholder={ input.placeholder }
              value={ input.value }
              onChange={ input.onChange }
              invalid={ input.errorMessage && input.errorMessage.length > 0 }
            />
            { input.errorMessage && (
              <p style={ { fontSize: "12px", padding: "3px", color: "red" } }>
                { input.errorMessage }
              </p>
            ) }
          </div>
        )) }

        <Label className="mt-2 mb-0" htmlFor="product_photo">
          Products Picture
        </Label>
        <div className="d-flex flex-column gap-2">
          <Input
            type="file"
            name="myImage"
            label="choose image"
            onChange={ (event) => {
              setSelectedImage(event.target.files[ 0 ]);
            } }
          />
        </div>
        <div className="d-flex flex-column gap-2">
          <button
            className="btn btn-success mt-3"
            onClick={ addProductHandler }
            type="submit"
          >
            Add Product
          </button>
        </div>
        <table className="table table-striped table-hover mt-3 mb-3">
          <thead>
            { props.products.length > 0 && (
              <tr className="table-secondary">
                <th className="text-center" scope="col">
                  #
                </th>
                <th className="text-center" scope="col">
                  Product Name
                </th>
                <th className="text-center" scope="col">
                  Price
                </th>
                <th className="text-center" scope="col">
                  Quantity
                </th>
                <th className="text-center" scope="col">
                  Label
                </th>
                <th className="text-center" scope="col">
                  Description
                </th>
                <th className="text-center" scope="col">
                  Image
                </th>
                <th scope="col">Remove</th>
              </tr>
            ) }
          </thead>
          <tbody>
            { props.products.map((product) => (
              <tr key={ product.productId } className="table-secondary">
                <td className="text-center">{ product.productId }</td>
                <td className="text-center">{ product.name }</td>
                <td className="text-center">{ product.price }</td>
                <td className="text-center">{ product.quantity }</td>
                <td className="text-center">{ product.lables }</td>
                <td className="text-center">{ product.description }</td>
                <td className="text-center">
                  { selectedImage && (
                    <img
                      className="img-thumbnail w-75 h-75"
                      alt="not found"
                      src={ `data:image/jpeg;base64,${product.photo}` }
                    />
                  ) }
                </td>
                <td className="text-center">
                  <button
                    className="btn"
                    type="button"
                    onClick={ () => {
                      props.deleteProductHandler(product.productId);
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
            )) }
          </tbody>
        </table>
      </form>
    </>
  );
};

export default Products;
