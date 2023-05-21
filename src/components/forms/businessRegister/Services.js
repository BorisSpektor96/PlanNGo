import React from "react";
import { FormGroup, Button, Label, Input } from "reactstrap";
import { useState } from "react";

const Services = (props) => {

  const [ enteredService, setEnteredService ] = useState("");
  const [ enteredPrice, setEnteredPrice ] = useState("");
  const [ enteredDuration, SetEnteredDuration ] = useState("");
  const [ idNumber, setIdNumber ] = useState(1);
  let [ serviceList, setServiceList ] = useState([]);

  const addServiceHandler = (event) => {
    event.preventDefault(); // Prevents the page from refreshing
    setServiceList((prevServiceList) => {
      setIdNumber(idNumber + 1)
      return [
        ...prevServiceList,
        { id: idNumber, name: enteredService, price: enteredPrice, duration: enteredDuration },
      ];
    });
  };

  const serviceChangeHandler = (event) => {
    setEnteredService(event.target.value);
    console.log(enteredService)
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const durationHandler = (event) => {
    SetEnteredDuration(event.target.value);
  };

  if (props.currentStep !== 3) {
    return null;
  }

  const deleteHandler = (event) => {
    setServiceList((serviceList) = serviceList.filter((service) =>
      event.id !== service.id
    ))
  }

  return (
    <div>
      <p className="display-6 text-center">Add Your Services</p>
      <FormGroup className="form-check p-0">

        <Label htmlFor="service">Service name</Label>
        <Input
          id="service"
          type="text"
          value={ enteredService }
          onChange={ serviceChangeHandler }
        />

        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="text"
          value={ enteredPrice }
          onChange={ priceChangeHandler }
        />

        <Label htmlFor="Duration">Duration (enter min)</Label>
        <Input
          id="Duration"
          type="number"
          value={ enteredDuration }
          onChange={ durationHandler }
        />

        <Button className="btn btn-success mt-3" onClick={ addServiceHandler } type="submit">
          Add Service
        </Button>

        <table className="table table-striped table-hover mt-3 mb-3">
          <thead>
            { serviceList.length > 0 &&
              <tr className="table-dark">
                <th className="text-center" scope="col">Service Name</th>
                <th className="text-center" scope="col">Price</th>
                <th className="text-center" scope="col">Duration</th>
                <th className="d-flex justify-content-center" scope="col">Remove</th>
              </tr>
            }
          </thead>
          <tbody>
            { serviceList.map((service) => (

              <tr key={ service.id } className="table-success">
                <th className="text-center" scope="row">{ service.name }</th>
                <td className="text-center">{ service.price }</td>
                <td className="text-center">{ service.duration }</td>
                <td className="text-center">
                  <button onClick={ () => { deleteHandler(service) } }>
                    <lord-icon
                      src="https://cdn.lordicon.com/gsqxdxog.json"
                      trigger="hover"
                      colors="primary:#c71f16,secondary:#000000"
                      styles="width:250px;height:250px">
                    </lord-icon>
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>

      </FormGroup>
    </div >
  );
};
export default Services;
