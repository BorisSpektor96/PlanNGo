import { React, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Products = (props) => {
  const [ selectedImage, setSelectedImage ] = useState("");
  const [ enteredDescription, setEnteredDescription ] = useState("");
  const [ enteredName, setEnteredName ] = useState("");
  const [ enteredQuantity, setEnteredQuantity ] = useState(1);
  const [ enteredPrice, setEnteredPrice ] = useState("");
  let [ productId, setProductId ] = useState(1);

  const addProducteHandler = (event) => {
    event.preventDefault(); // Prevents the page from refreshing
    setProductId(productId + 1);
    props.handleProducts(
      productId,
      enteredPrice,
      enteredDescription,
      enteredName,
      enteredQuantity
    );
  };

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
    console.log(enteredName);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const DescriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  if (props.currentStep !== 4) {
    return null;
  }

  return (
    <>

      <p className="text-center display-6">Products</p>
      <FormGroup className="form-check p-0">
        <Label className="mt-2 mb-0" for="business_name">
          Product Name
        </Label>
        <Input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Enter Product Name"
          value={ enteredName } // Prop: The product_name input data
          onChange={ nameChangeHandler } // Prop: Puts data into the state
        />

        <Label className="mt-2 mb-0" for="product_price">
          products price
        </Label>
        <Input
          type="number"
          name="product_price"
          id="product_price"
          placeholder="Enter product price"
          value={ enteredPrice } // Prop: The product_price input data
          onChange={ priceChangeHandler } // Prop: Puts data into the state
        />
        <Label className="mt-2 mb-0" for="product_price">
          products quantity
        </Label>
        <Input
          type="number"
          name="product_quantity"
          id="product_quantity"
          placeholder="Enter product quantity"
          value={ enteredQuantity } // Prop: The product_price input data
          onChange={ quantityChangeHandler } // Prop: Puts data into the state
        />

        <Label className="mt-2 mb-0" for="product_description">
          products description
        </Label>
        <Input
          type="text"
          name="product_description"
          id="product_description"
          placeholder="Enter products description"
          value={ enteredDescription } // Prop: The product_description input data
          onChange={ DescriptionChangeHandler } // Prop: Puts data into the state
        />

        <Label className="mt-2 mb-0" for="product_photo">
          Products picture
        </Label>
        <div className="d-flex flex-column gap-2">
          { selectedImage && (
            <div className="d-flex justify-content-around">
              <img
                alt="not found"
                width={ "50px" }
                height={ "50px" }
                src={ URL.createObjectURL(selectedImage) }
              />
              <br />
              <button className="btn btn-outline-danger" onClick={ () => setSelectedImage(null) }>Remove</button>
            </div>
          ) }
          <input
            type="file"
            name="myImage"
            lable="choose image"
            onChange={ (event) => {
              console.log(event.target.files[ 0 ]);
              setSelectedImage(event.target.files[ 0 ]);
            } }
          />
        </div>
        <div className="d-flex flex-column gap-2">
          <button
            className="btn btn-success mt-3"
            onClick={ addProducteHandler }
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
                  quantity
                </th>
                <th className="text-center" scope="col">
                  Description
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
                <td className="text-center">{ product.description }</td>
                <td className="text-center">
                  <button className="btn"
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
      </FormGroup>
    </>
  );
};
export default Products;
