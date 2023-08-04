import { useState, useContext, useEffect } from "react"
import FormInput from "../forms/FormInput"
import { ProfileInfoContext } from '../../ProfileInfoContext';
import { PopupMessageContext } from "../../PopupMessage";

const ServicesProfile = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const [ editServicesMode, setEditServicesMode ] = useState(false)

  const { profileInfo } = useContext(ProfileInfoContext);

  // const [ serviceId, setServiceId ] = useState(0);
  const [ services, setServices ] = useState([]);

  const [ service, setService ] = useState({
    name: "",
    price: 0,
    duration: 0,
    type: "",
    description: "",
    image: "",
  })

  const editServicesModeHandler = () => {
    setEditServicesMode(!editServicesMode)
  }

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/business/getBusinessServices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email })
      });

      if (response.ok) {
        const servicesData = await response.json();

        if (servicesData !== null) {
          setServices(servicesData);
        } else {
          setServices(servicesData);
        }
      } else {
        console.log("not ok ")
        setServices([]);
      }
    } catch (error) {
      console.log('Error:', error);
      setServices([]);
    }
  };

  useEffect(() => {
    if (profileInfo.isBusiness) {
      fetchServices();
    }
  }, [ editServicesMode, profileInfo ]);

  const handleInputServiceChange = (e) => {
    const { name, value } = e.target;
    setService(prevData => ({
      ...prevData,
      [ name ]: value
    }));
  };

  const submitServiceForm = (e) => {
    e.preventDefault()
    // setServiceId((serviceId + 1))
    const newService = {
      // id: serviceId,
      ...service,
    }
    addServiceHandler(newService)
  }

  const addServiceHandler = async (service) => {
    try {
      const response = await fetch('http://localhost:3001/business/addService', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email, service })
      });
      const data = await response.json()

      if (response.ok) {
        showMessage(data.showMessage, data.type)
        fetchServices();
      } else {
        showMessage(data.showMessage, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const deleteServiceHandler = async (serviceId) => {
    try {
      const response = await fetch('http://localhost:3001/business/deleteService', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profileInfo.email, serviceId })
      });
      const data = await response.json()
      if (response.ok) {
        showMessage(data.showMessage, data.type)
        fetchServices();
      } else {
        showMessage(data.showMessage, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
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
    <>
      { profileInfo.isBusiness
        &&
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
      }
    </>
  )

  const showServicesInTable = (
    <>
      { profileInfo.isBusiness
        &&
        <div className="row p-0 m-3">
          <div className="card d-flex border-primary">
            <div className="p-2 d-flex justify-content-around">
              <h5 className="p-0 m-0">
                Services Details
              </h5>
              { !editServicesMode
                ?
                <div>
                  <button className="border-0" onClick={ editServicesModeHandler } >
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
                :
                <button className="text-center col-4 btn btn-primary"
                  type="button"
                  onClick={ editServicesModeHandler }
                >
                  Save changes
                </button>
              }
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              { services.length > 0
                &&
                <tr className="table-secondary ">
                  <th className="text-center  " scope="col">
                    Service Name
                  </th>
                  <th className="text-center" scope="col">
                    Price
                  </th>
                  <th className="text-center" scope="col">
                    Duration
                  </th>
                  {
                    editServicesMode &&
                    <th className="text-center" scope="col">
                      Remove
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody>
              { services.length > 0
                ?
                (
                  services.map((service) => (
                    <tr key={ service._id } className="table-secondary">

                      <td className="text-center">{ service.name }</td>
                      <td className="text-center">{ service.price }$</td>
                      <td className="text-center">{ service.duration } (hour/s)</td>

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
          </table>
        </div>
      }
    </>
  )

  return (
    <div className="d-flex justify-content-center">
      <div className="col-12 rounded p-4 pt-0 pb-0">

        { showServiceAddInputs }
        { showServicesInTable }

      </div >
    </div >
  )

}
export default ServicesProfile;