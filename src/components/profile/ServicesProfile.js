import { useState } from "react"
import FormInput from "../forms/FormInput"

const ServicesProfile = props => {

  const [ editServicesMode, setEditServicesMode ] = useState(false)
  const [ service, setService ] = useState({
    name: "",
    duration: 0,
    price: 0,
    type: "",
    description: "",
    image: "",
  })

  const editServiceModeHandler = () => {
    setEditServicesMode(!editServicesMode)
  }

  const servicesListInputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Service Name: ",
      required: true,
      errorMessage: "Must Be Name to Service",
    },
    {
      id: "price",
      name: "price",
      type: "number",
      label: "Price",
      placeholder: "Enter Service Price: ",
      required: true,
      min: 1,
      errorMessage: "Must Be Price to Service",
    },
    {
      id: "duration",
      name: "duration",
      type: "number",
      label: "Duration",
      placeholder: "Enter Service Duration: ",
      required: true,
      min: 1,
      errorMessage: "Must Be Duration to Service Can't Be 0",
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
      id: "type",
      name: "type",
      type: "text",
      label: "type",
      placeholder: "Enter Service type: ",
      required: true,
      errorMessage: "Must Be type to the Service",
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

  const showServiceAddInputs = (
    <div>
      <form >
        {/* <form onSubmit={ addServiceHandler }> */ }
        {
          editServicesMode
          &&
          <div className="card xl-12">
            <div className="card-body d-flex flex-wrap gap-3 justify-content-center">
              { servicesListInputs.map((input, key) => (
                < div className=" d-flex flex-wrap" key={ key } >
                  <div>
                    <FormInput
                      key={ key }
                      { ...input }
                      value={ service[ input.name ] }
                    // onChange={ handleInputProductChange }
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
                Add Service
              </button>
            </div>
          </div >
        }
      </form >
    </div>
  )

  const showServicesInTable = (
    <div className="d-flex flex-column m-3">
      <div className="col">
        <div className="d-flex justify-content-between p-1 mb-2">
          <div className="d-flex align-items-end">
            <u>Services Details</u>
          </div>
          { !editServicesMode
            && <div className="">
              <button className="border btn btn-outline-Wraning"
                onClick={ editServiceModeHandler }
              >
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
      <table table className="table table-striped table-hover mt-3 mb-3" >
        <thead>
          <tr className="table-secondary ">
            <th className="text-center  " scope="col">
              Service Name
            </th>
            <th className="text-center" scope="col">
              Type
            </th>
            <th className="text-center" scope="col">
              Price
            </th>
            <th className="text-center" scope="col">
              Duration
            </th>
            <th className="text-center" scope="col">
              Description
            </th>
            {
              editServicesMode &&
              <th scope="col">
                Remove
              </th>
            }
          </tr>
        </thead>
        <tbody>
          { props.profileInfo.services.map((service) => (
            <tr key={ service.id } className="table-secondary">

              <td className="text-center">{ service.name }</td>
              <td className="text-center">{ service.type }</td>
              <td className="text-center">{ service.price }</td>
              <td className="text-center">{ service.duration }</td>
              <td className="text-center">{ service.description }</td>
              { editServicesMode &&
                <td className="text-center">
                  <button className="btn btn-danger"
                    onClick={ () => {
                      // props.deleteServicesHandler(service.id);
                    } }
                  >
                    X
                  </button>
                </td>
              }
            </tr>
          )) }
        </tbody>
      </table >
      {
        editServicesMode
        &&
        <button className="btn btn-primary"
          type="button"
          onClick={ editServiceModeHandler }
        >
          Save changes
        </button>
      }
    </div>
  )

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-11">
        { showServicesInTable }
      </div >
    </div >
  )

}

export default ServicesProfile