import React, { useState } from "react";
import { Button } from "reactstrap";
import { Input, Label } from "reactstrap";

const Services = (props) => {
  const [ enteredName, setEnteredName ] = useState("");
  const [ enteredPrice, setEnteredPrice ] = useState("");
  const [ enteredDuration, setEnteredDuration ] = useState(0.5);
  const [ serviceId, setServiceId ] = useState(1);

  if (props.currentStep !== 3) {
    return null;
  }
  const addServiceHandler = (event) => {
    event.preventDefault();

    const formIsValid = Object.values(formInputs).every(
      (input) => input.errorMessage === ""
    );

    if (!formIsValid) {
      return;
    }

    setServiceId(serviceId + 1);
    props.handleServices(
      enteredName,
      enteredPrice,
      enteredDuration,
      serviceId
    );
    setEnteredName("");
    setEnteredPrice("");
    setEnteredDuration(0.5);
  };



  const durationOptions = [ 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 ];

  const formInputs = [
    {
      id: "name",
      label: "Service Name",
      placeholder: "Enter Service Name",
      value: enteredName,
      onChange: (event) => setEnteredName(event.target.value),
      errorMessage: enteredName.trim() === "" ? "Please enter Service Name" : "",
      pattern: "^[a-zA-Z0-9 ]+$",

      type: "text",
    },

    {
      id: "price",
      label: "Price",
      placeholder: "Enter Price",
      type: "number",
      value: enteredPrice,
      onChange: (event) => setEnteredPrice(event.target.value),
      errorMessage:
        enteredPrice.trim() === "" || isNaN(enteredPrice)
          ? "Please enter a valid price"
          : "",
      pattern: "^[0-9]+$",

    },
    {
      id: "duration",
      label: "Duration (enter in hours)",
      type: "number",
      value: enteredDuration,
      onChange: (event) => setEnteredDuration(event.target.value),
      errorMessage: isNaN(enteredDuration) ? "Duration must be a number" : "",
    },
  ];
  return (
    <div>
      <p className="display-6 text-center">Add Your Services</p>
      <form className="form-check p-0">
        { formInputs.map((input) => (
          <React.Fragment key={ input.id }>
            { input.id === "duration" ? (
              <div className="form-group">
                <label htmlFor="duration">{ input.label }</label>
                <select
                  id="duration"
                  className="form-control"
                  value={ enteredDuration }
                  onChange={ input.onChange }
                  required={ input.required }
                >
                  { durationOptions.map((option) => (
                    <option key={ option } value={ option }>
                      { option } hours
                    </option>
                  )) }
                </select>
              </div>
            ) : (
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
            ) }
          </React.Fragment>
        )) }

        <Button
          className="btn btn-success mt-3"
          onClick={ addServiceHandler }
          type="submit"
        >
          Add Service
        </Button>

        <table className="table table-striped table-hover mt-3 mb-3">
          <thead>
            { props.services.length > 0 && (
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

                <th scope="col">Remove</th>
              </tr>
            ) }
          </thead>
          <tbody>
            { props.services.map((service) => (
              <tr key={ service.id } className="table-secondary">
                <td className="text-center">{ service.name }</td>
                <td className="text-center">{ service.price }</td>
                <td className="text-center">{ service.duration }</td>
                <td className="text-center">
                  <button
                    className="btn"
                    type="button"
                    onClick={ () => {
                      props.deleteServicesHandler(service.id);
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
    </div>
  );
};

export default Services;