import React from "react";
import { FormGroup, Button, Label, Input } from "reactstrap";
import { useState } from "react";
const Services = (props) => {

  const [ enteredService, setEnteredService ] = useState("");
  const [ enteredPrice, setEnteredPrice ] = useState("");
  const [ enteredDuration, SetEnteredDuration ] = useState("");
  const [ serviceList, setServiceList ] = useState([]);

  const addServiceHandler = (event, uName, uAge) => {
    event.preventDefault(); // Prevents the page from refreshing
    setServiceList((prevServiceList) => {
      return [
        ...prevServiceList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  const serviceChangeHandler = (event) => {
    setEnteredService(event.target.value);
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

  return (
    <>
      <p>Services</p>
      <FormGroup className="form-check mb-2 mr-sm-2">

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

        <Button className="mt-3" onClick={ addServiceHandler } type="submit">
          Add User
        </Button>


        <ul className="list-unstyled">
          { serviceList.map((service) => (

            <li key={ service.id }>
              <button>
                <lord-icon
                  src="https://cdn.lordicon.com/gsqxdxog.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#08a88a"
                  styles="width:250px;height:250px"
                ></lord-icon>
              </button>
              { service.name } { service.age }
            </li>
          )) }

        </ul>

      </FormGroup>
    </>
  );
};
export default Services;
