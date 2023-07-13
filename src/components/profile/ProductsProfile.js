import FormInput from "../forms/FormInput"
import { useState, useContext, useEffect } from "react";
import './profile.css'
import { ProfileInfoContext } from '../../ProfileInfoContext';

const ProductsProfile = () => {

  const [ editProductsMode, setEditProductsMode ] = useState(false)

  const { profileInfo } = useContext(ProfileInfoContext);

  // const [ productId, setProductId ] = useState(0);
  const [ products, setProducts ] = useState([]);

  const [ product, setProduct ] = useState({
    // id: productId,
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    image: "",
  })

  const editProductsModeHandler = () => {
    setEditProductsMode(!editProductsMode)
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/business/getBusinessProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });

      if (response.ok) {
        const productsData = await response.json();
        if (productsData !== null) {
          setProducts(productsData);
        } else {
          setProducts(productsData);
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log('Error:', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [ profileInfo.email ]);

  const inputProductHandlerChange = (e) => {

    const { name, value } = e.target
    setProduct(prevData => ({
      ...prevData,
      [ name ]: value
    }))
  };

  const submitProductForm = (e) => {
    e.preventDefault()
    // setProductId((productId + 1))
    const newProduct = {
      // id: productId,
      ...product
    }
    addProductHandler(newProduct)
  }

  const addProductHandler = async (product) => {
    try {
      const response = await fetch('http://localhost:3001/business/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email, product })
      });

      if (response.ok) {
        alert('product added successfully');
        fetchProducts();
      } else {
        console.log('Failed to add product');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const response = await fetch('http://localhost:3001/business/deleteProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email, productId })
      });

      if (response.ok) {
        fetchProducts();
      } else {
        console.log('Failed to delete product');
      }
    } catch (error) {
      console.log('Error:', error);
    }
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
    <>
      { profileInfo.isBusiness
        &&
        <div className={ !editProductsMode ? "hide" : "show pt-4 pb-4 card" }>
          <form onSubmit={ submitProductForm }>
            {
              <div className="xl-12">
                <div className="card-body d-flex flex-wrap gap-3 justify-content-center">
                  { productsListInputs.map((input, key) => (
                    < div className=" d-flex flex-wrap" key={ key } >
                      <div>
                        <FormInput
                          key={ key }
                          { ...input }
                          value={ profileInfo[ input.name ] }
                          onChange={ inputProductHandlerChange }
                        />

                      </div>
                    </div>
                  ))
                  }
                </div>
                <div className="d-flex justify-content-center ">
                  <button className="mt-3 text-center col-4 btn btn-success"
                    type="submit"
                  >
                    Add Product
                  </button>
                </div>
              </div >
            }
          </form >
        </div>
      }
    </>
  )

  const showProductsInTable = (
    <>
      {
        profileInfo.isBusiness
        &&
        <div className="p-0 d-flex flex-column m-3">
          <div className="border border-primary">
            <div className="card-header d-flex justify-content-around p-1">
              <div className="d-flex align-items-center">
                Products Details
              </div>
              { !editProductsMode
                && <div>
                  <button className="border-0" onClick={ editProductsModeHandler }>
                    <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                    <lord-icon
                      src="https://cdn.lordicon.com/puvaffet.json"
                      trigger="loop"
                      stroke="85"
                      colors="primary:#121331,secondary:#2516c7"
                      styles="width:250px;height:250px">
                    </lord-icon>
                  </button>
                </div>
              }
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              { products.length > 0 && (
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
              { products.length > 0
                ?
                (
                  products.map((product) => (
                    <tr tr key={ product._id } className="table-secondary" >

                      <td className="text-center">{ product._id }</td>
                      <td className="text-center">{ product.name }</td>
                      <td className="text-center">{ product.price }</td>
                      <td className="text-center">{ product.quantity }</td>
                      <td className="text-center">{ product.description }</td>

                      { editProductsMode &&
                        <td className="text-center">
                          <button className="btn p-0 m-0"
                            onClick={ () => {
                              deleteProductHandler(product.id);
                            } }
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gsqxdxog.json"
                              trigger="hover"
                              colors="primary:#c71f16,secondary:#000000"
                              stroke="100"
                              styles="width:250px;height:250px"
                            ></lord-icon>
                          </button>
                        </td>
                      }

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No Products</td>
                  </tr>
                ) }
            </tbody>
          </table>
          {
            editProductsMode
            &&
            <div className="d-flex justify-content-center ">
              <button className="mb-3 text-center col-4 btn btn-primary"
                type="button"
                onClick={ editProductsModeHandler }
              >
                Save changes
              </button>
            </div>
          }
        </div >
      }
    </>
  )

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-11">

        { showProductAddInputs }
        { showProductsInTable }

      </div >
    </div >
  )

}

export default ProductsProfile;