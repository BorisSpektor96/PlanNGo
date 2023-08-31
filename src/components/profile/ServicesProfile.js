import { useState, useContext, useEffect } from "react"
import FormInput from "../forms/FormInput"
import { PopupMessageContext } from "../../PopupMessage";
import { useSelector, useDispatch } from "react-redux";
import {
  addService,
  deleteService
} from '../../profileInfoSlice'
const ServicesProfile = () => {

  const dispatch = useDispatch()
  const profileInfo = useSelector(state => state.profileInfo)

  const { showMessage } = useContext(PopupMessageContext)

  const [ editServicesMode, setEditServicesMode ] = useState(false)

  const [ services, setServices ] = useState([]);

  const [ service, setService ] = useState({
    name: "",
    price: 0,
    duration: 0,
  })

  const editServicesModeHandler = () => {
    setEditServicesMode(!editServicesMode)
  }

  useEffect(() => {
    if (profileInfo.isBusiness) {
      setServices(profileInfo.services)
    }
  }, [ profileInfo, editServicesMode ]);
  const handleInputServiceChange = (e) => {
    const { name, value } = e.target;
    setService(prevData => ({
      ...prevData,
      [ name ]: value
    }));
  };

  const submitServiceForm = (e) => {
    e.preventDefault()
    const newServiceId = profileInfo.services.reduce(
      (maxId, service) => Math.max(maxId, service.serviceId),
      0
    ) + 1;
    const newService = {
      ...service,
      serviceId: newServiceId
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
        showMessage(data.message, data.type)
        dispatch(addService(service))
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
        body: JSON.stringify({ email: profileInfo.email, serviceId: serviceId })
      });
      const data = await response.json()
      if (response.ok) {
        showMessage(data.message, data.type)
        dispatch(deleteService(serviceId))
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
      errorMessage: "Must Be Duration to Service of 0.25 steps",
      step: "0.25"
    }
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
                              deleteServiceHandler(service.serviceId);
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