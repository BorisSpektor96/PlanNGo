import { useState, useContext, useEffect } from "react"
import FormInput from "../forms/FormInput"
import { ProfileInfoContext } from '../../ProfileInfoContext';

const ServicesProfile = () => {

  const [ editServicesMode, setEditServicesMode ] = useState(false)

  const { profileInfo, dispatch } = useContext(ProfileInfoContext);

  const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);

  const [ service, setService ] = useState({
    name: "",
    price: 0,
    duration: 0,
    type: "",
    description: "",
    image: "",
  })

  const editServiceModeHandler = () => {
    setEditServicesMode(!editServicesMode)
  }

  const [ serviceId, setServiceId ] = useState(0);

  useEffect(() => {
    if (profileInfo && profileInfo.services && profileInfo.services.length > 0) {
      setServiceId(profileInfo.services[ profileInfo.services.length - 1 ].id + 1);
    }
  }, [ profileInfo ]);

  const handleInputServiceChange = (e) => {
    const { name, value } = e.target;
    setService(prevData => ({
      ...prevData,
      [ name ]: value
    }));
  };

  const submitServiceForm = (e) => {
    e.preventDefault()
    setServiceId((serviceId + 1))
    const newService = {
      id: serviceId,
      ...service,
    }
    const updatedServices = [ ...localProfileInfo.services, newService ]
    setLocalProfileInfo(prev => ({
      ...prev,
      services: [ ...prev.services, newService ]
    }));
    dispatch({ type: 'UPDATE_SERVICES', payload: updatedServices });
  }

  const deleteServiceHandler = (serviceId) => {
    const updatedServices = localProfileInfo.services.filter(service => service.id !== serviceId
    )
    setLocalProfileInfo(prev => ({
      ...prev,
      services: updatedServices
    }));
    dispatch({ type: 'DELETE_SERVICE', payload: updatedServices });
  };

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
      id: "type",
      name: "type",
      type: "text",
      label: "type",
      placeholder: "Enter Service type: ",
      required: true,
      errorMessage: "Must Be type to the Service",
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

  const showServiceAddInputs = (
    <div className={ !editServicesMode ? "hide" : "show pt-4 pb-4 card" }>
      <form onSubmit={ submitServiceForm }>
        {
          editServicesMode
          &&
          <div className="">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              { servicesListInputs.map((input, key) => (
                < div className=" d-flex flex-wrap" key={ key } >
                  <div>
                    <FormInput
                      key={ key }
                      { ...input }
                      value={ profileInfo[ input.name ] }
                      onChange={ handleInputServiceChange }
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
      <div className="col card border-primary">
        <div className="card-header d-flex justify-content-around p-1">
          <div className="d-flex align-items-center">
            Services Details
          </div>
          { !editServicesMode
            && <div>
              <button className="border-0"
                onClick={ editServiceModeHandler }
              >
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
      <table className="card-body table table-striped table-hover">
        <thead>
          { localProfileInfo.services.length > 0
            &&
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
          }
        </thead>
        <tbody>
          { localProfileInfo.services && localProfileInfo.services.length > 0 ? (
            localProfileInfo.services.map((service) => (
              <tr key={ service.id } className="table-secondary">

                <td className="text-center">{ service.name }</td>
                <td className="text-center">{ service.type }</td>
                <td className="text-center">{ service.price }</td>
                <td className="text-center">{ service.duration }</td>
                <td className="text-center">{ service.description }</td>

                { editServicesMode &&
                  <td className="text-center">
                    <button className="btn p-0 m-0"
                      onClick={ () => {
                        deleteServiceHandler(service.id);
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
              <td colSpan="5" className="text-center">No Services</td>
            </tr>
          ) }
        </tbody>
      </table >
      {
        editServicesMode
        &&
        <div className="d-flex justify-content-center ">
          <button className="mb-3 text-center col-4 btn btn-primary"
            type="button"
            onClick={ editServiceModeHandler }
          >
            Save changes
          </button>
        </div>
      }
    </div>
  )

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-11 rounded">

        { showServiceAddInputs }
        { showServicesInTable }
      </div >
    </div >
  )

}
export default ServicesProfile;