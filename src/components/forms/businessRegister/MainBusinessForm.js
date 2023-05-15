import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";

import BusinessInfo from "./BusinessInfo";
import PersonalInfo from "./PersonalInfo";
import Products from "./Products";
import Services from "./Services";
import MultiStepProgressBar from "./MultiStepProgressBar";

class MainBusinessForm extends Component {
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      currentStep: 1,
      type: "",
      email: "",
      business_email: "",
      fullname: "",
      personal_phone: "",
      business_phone: "",
      password: "",
      address: "",
      business_name: "",
      description: "",
      services: [
        {
          name: "",
          price: "",
          time: "",
        },
      ],
      products: [
        {
          serial_number: "",
          price: "",
          description: "",
          name: "",
          picture: "",
          quantity: "",
        },
      ],
      photo_gallery: [],
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  // Use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [ name ]: value,
    });
  }

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, fullname, password, business_phone, address, type } = this.state;
    alert(`Your registration detail: \n 
      Email: ${email} \n 
      fullname: ${fullname} \n
      Password: ${password}\n
      business_phone: ${business_phone}\n
      type: ${type}\n
      address: ${address}
      `);
  };

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;

    // If the current step is 1 or 2, then add one on "next" button click
    if (currentStep > 0 && currentStep < 4) {
      currentStep += 1;
    }
    this.setState({
      currentStep: currentStep,
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    if (currentStep !== 1) {
      currentStep -= 1;
    }
    this.setState({
      currentStep: currentStep,
    });
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left" onClick={ this._prev }>
          Previous
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 4) {
      return (
        <Button color="primary float-right" onClick={ this._next }>
          Next
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 3) {
      return <Button color="primary float-right">Submit</Button>;
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <>
        <Form onSubmit={ this.handleSubmit }>
          <Card>
            <CardHeader>Create an Business Account</CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={ this.state.currentStep } />
              </CardTitle>
              <CardText />
              <PersonalInfo
                currentStep={ this.state.currentStep }
                handleChange={ this.handleChange }
                email={ this.state.email }
              />
              <BusinessInfo
                currentStep={ this.state.currentStep }
                handleChange={ this.handleChange }
                email={ this.state.username }
              />
              <Services
                currentStep={ this.state.currentStep }
                handleChange={ this.handleChange }
                email={ this.state.password }
              />
              <Products
                currentStep={ this.state.currentStep }
                handleChange={ this.handleChange }
                email={ this.state.password }
              />
            </CardBody>
            <CardFooter className="d-flex justify-content-around">
              { this.previousButton }
              { this.nextButton }
              { this.submitButton }
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MainBusinessForm;
