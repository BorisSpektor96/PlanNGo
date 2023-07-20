import React, { useState } from "react";
import { Button } from "reactstrap";
import FormInput from "../FormInput";

const Services = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDuration, setEnteredDuration] = useState(30); // Default duration is set to 30 minutes
  const [enteredType, setEnteredType] = useState("");
  const [serviceId, setServiceId] = useState(1);

  const addServiceHandler = (event) => {
    event.preventDefault();
    setServiceId(serviceId + 1);
    props.handleServices(
      enteredType,
      enteredName,
      enteredPrice,
      enteredDuration,
      serviceId
    );
    // Clear the input fields after adding a service
    setEnteredName("");
    setEnteredPrice("");
    setEnteredDuration(0.5); // Reset duration to the default (30 minutes)
    setEnteredType("");
  };

  if (props.currentStep !== 3) {
    return null;
  }

  const durationOptions = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4,4.5,5];

  const formInputs = [
    {
      id: "name",
      label: "Service Name",
      placeholder: "Enter Service Name",
      value: enteredName,
      onChange: (event) => setEnteredName(event.target.value),
      errorMessage: "missing service name",
      pattern: "^[a-zA-Z0-9 ]+$",
      required: true,
    },
    {
      id: "type",
      label: "Service Type",
      placeholder: "Enter Service Type",
      value: enteredType,
      onChange: (event) => setEnteredType(event.target.value),
      required: true,
    },
    {
      id: "price",
      label: "Price",
      placeholder: "Enter Price",
      value: enteredPrice,
      onChange: (event) => setEnteredPrice(event.target.value),
      errorMessage: "must be a number",
      pattern: "^\\d+$",
      required: true,
    },
    {
      id: "duration",
      label: "Duration (enter in hours)",
      value: enteredDuration,
      onChange: (event) => setEnteredDuration(event.target.value),
      required: true,
    },
  ];

  return (
    <div>
      <p className="display-6 text-center">Add Your Services</p>
      <form className="form-check p-0">
        {formInputs.map((input) => (
          <React.Fragment key={input.id}>
            {input.id === "duration" ? (
              <div className="form-group">
                <label htmlFor="duration">{input.label}</label>
                <select
                  id="duration"
                  className="form-control"
                  value={enteredDuration}
                  onChange={input.onChange}
                  required={input.required}
                >
                  {durationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} hours
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <FormInput {...input} />
            )}
          </React.Fragment>
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
                <th className="text-center" scope="col">
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
