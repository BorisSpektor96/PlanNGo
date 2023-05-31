import FormInput from "../forms/FormInput"
import { useState } from "react";
import './profile.css'

const ProductsProfile = props => {


  const [ editProductsMode, setEditProductsMode ] = useState(false)

  const editProductsModeHandler = () => {
    setEditProductsMode(!editProductsMode)
  }

  const [ productId, setProductId ] = useState(
    parseInt(props.profileInfo.products[ props.profileInfo.products.length - 1 ].id) + 1
  );
  const [ product, setProduct ] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    image: "",
  })

  const handleInputProductChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevData => ({
      ...prevData,
      [ name ]: value
    }));
  };

  const submitProductsHandler = (e) => {
    e.preventDefault()
    editProductsModeHandler()
  }

  const addProducteHandler = (e) => {
    e.preventDefault()
    setProductId((parseInt(productId) + 1).toString())
    const newProduct = {
      id: productId,
      ...product,
    };
    props.setProfileInfo(prevState => ({
      ...prevState,
      products: [ ...prevState.products, newProduct ]
    }));
  }
  const deleteProductHandler = (productId) => {
    props.setProfileInfo(prevState => ({
      ...prevState,
      products: prevState.products.filter(product => product.id !== productId)
    }));
  };

  const productsListInputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Product Name: ",
      required: true,
      errorMessage: "Must Be Name to Product",
    },
    {
      id: "price",
      name: "price",
      type: "number",
      label: "Price",
      placeholder: "Enter Product Price: ",
      required: true,
      min: 1,
      errorMessage: "Must Be Price to Product",
    },
    {
      id: "quantity",
      name: "quantity",
      type: "number",
      label: "Quantity",
      placeholder: "Enter Product Quantity: ",
      required: true,
      min: 1,
      errorMessage: "Must Be Quantity to Product Can't Be 0",
    },
    {
      id: "description",
      name: "description",
      type: "text",
      label: "Description",
      placeholder: "Enter Product Description: ",
      required: true,
      errorMessage: "Must Be Description to the Product",
    },
    {
      id: "image",
      name: "image",
      type: "file",
      label: "Add Image",
      placeholder: "Enter Product Description: ",
      required: false,
      errorMessage: "Must Be an Image",
    },
  ]

  const showProductAddInputs = (
    <div className={ !editProductsMode ? "hide" : "show" }>
      <form onSubmit={ addProducteHandler }>
        {
          // editProductsMode
          // &&
          <div className="card xl-12">
            <div className="card-body d-flex flex-wrap gap-3 justify-content-center">
              { productsListInputs.map((input, key) => (
                < div className=" d-flex flex-wrap" key={ key } >
                  <div>
                    <FormInput
                      key={ key }
                      { ...input }
                      value={ product[ input.name ] }
                      onChange={ handleInputProductChange }
                    />

                  </div>
                </div>
              ))
              }
            </div>
            <div className="d-flex justify-content-center mb-3">
              <button
                className="btn btn-success mt-3"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </div >
        }
      </form >
    </div>
  )

  const showProductsInTable = (
    <div className="d-flex flex-column m-3">
      <div className="col">
        <div className="d-flex justify-content-between p-1 mb-2">
          <div className="d-flex align-items-end">
            <u>Products Details</u>
          </div>
          { !editProductsMode
            && <div className="">
              <button className="border btn btn-outline-Wraning" onClick={ editProductsModeHandler }>
                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                <lord-icon
                  src="https://cdn.lordicon.com/puvaffet.json"
                  trigger="loop"
                  colors="primary:#121331,secondary:#2516c7"
                  styles="width:250px;height:250px">
                </lord-icon>
              </button>
            </div>
          }
        </div>
      </div>
      <table className="table table-striped table-hover mt-3 mb-3">
        <thead>
          { props.profileInfo.products.length > 0 && (
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
                Description
              </th>
              { editProductsMode &&
                <th scope="col">Remove</th>
              }
            </tr>
          ) }
        </thead>
        <tbody>
          { props.profileInfo.products.map((product) => (
            <tr key={ product.productId } className="table-secondary">

              <td className="text-center">{ product.id }</td>
              <td className="text-center">{ product.name }</td>
              <td className="text-center">{ product.price }</td>
              <td className="text-center">{ product.quantity }</td>
              <td className="text-center">{ product.description }</td>
              { editProductsMode &&
                <td className="">
                  <btn className="curserBtn"
                    onClick={ () => {
                      deleteProductHandler(product.id);
                    } }
                  >
                    {/* X */ }
                    <lord-icon
                      src="https://cdn.lordicon.com/gsqxdxog.json"
                      trigger="hover"
                      colors="primary:#c71f16,secondary:#000000"
                      stroke="100"
                      styles="width:250px;height:250px"
                    ></lord-icon>
                  </btn>
                </td>
              }

            </tr>
          )) }
        </tbody>

      </table>
      {
        editProductsMode
        &&
        <button className="btn btn-primary"
          type="button"
          onClick={ editProductsModeHandler }
        >
          Save changes
        </button>
      }
    </div>
  )

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-11">
        {/* { editProductsMode && showProductAddInputs } */ }
        { showProductAddInputs }
        { showProductsInTable }
      </div >
    </div >
  )

}

export default ProductsProfile;