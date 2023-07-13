import React, { useState } from "react";
import { FormGroup, Button, Label } from "reactstrap";
import FormInput from "../FormInput"; // Assuming the FormInput component is in a separate file

const Services = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDuration, SetEnteredDuration] = useState("");
  const [enteredType, SetEnteredType] = useState("");
  let [serviceId, SetserviceId] = useState(1);

  const addServiceHandler = (event) => {
    event.preventDefault(); // Prevents the page from refreshing
    SetserviceId(serviceId + 1);
    props.handleServices(enteredType, enteredName, enteredPrice, enteredDuration, serviceId);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const typeChangeHandler = (event) => {
    SetEnteredType(event.target.value);
  };

  const durationHandler = (event) => {
    SetEnteredDuration(event.target.value);
  };

  if (props.currentStep !== 3) {
    return null;
  }

  const inputs = [
    {
      id: "name",
      label: "Service Name",
      placeholder: "Enter Service Name",
      value: enteredName,
      onChange: nameChangeHandler,
      errorMessage: "missing service name",
      pattern: "^[a-zA-Z0-9 ]+$",
      required: true,
    },
    {
      id: "type",
      label: "Service Type",
      placeholder: "Enter Service Type",
      value: enteredType,
      onChange: typeChangeHandler,
      required: true,
    },
    {
      id: "price",
      label: "Price",
      placeholder: "Enter Price",
      value: enteredPrice,
      onChange: priceChangeHandler,
      errorMessage: "must be a number",
      pattern: "^\\d+$",
      required: true,
    },
    {
      id: "duration",
      label: "Duration (enter min)",
      placeholder: "Enter Duration",
      value: enteredDuration,
      onChange: durationHandler,
      errorMessage: "must be a number",
      pattern: "^\\d+$",
      required: true,
    },
  ];

  return (
    <div>
      <p className="display-6 text-center">Add Your Services</p>
      <form className="form-check p-0">
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
          />
        ))}

        <Button
          className="btn btn-success mt-3"
          onClick={addServiceHandler}
          type="submit"
        >
          Add Service
        </Button>

        <table className="table table-striped table-hover mt-3 mb-3">
          <thead>
            {props.services.length > 0 && (
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
                <th className="text-center" scope="col">
                  Type
                </th>
                <th scope="col">Remove</th>
              </tr>
            )}
          </thead>
          <tbody>
            {props.services.map((service) => (
              <tr key={service.id} className="table-secondary">
                <td className="text-center">{service.name}</td>
                <td className="text-center">{service.price}</td>
                <td className="text-center">{service.duration}</td>
                <td className="text-center">{service.serviceType}</td>
                <td className="text-center">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      props.deleteServicesHandler(service.id);
                    }}
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
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Services;