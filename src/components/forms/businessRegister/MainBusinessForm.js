import React, { Component } from "react";
import {
  Form, Button, Card, CardHeader,
  CardBody, CardTitle, CardText,
  CardFooter,
} from "reactstrap";
import Modal from "../../UI/Modal";

import BusinessInfo from "./BusinessInfo";
import PersonalInfo from "./PersonalInfo";
import Products from "./Products";
import Services from "./Services";
import MultiStepProgressBar from "./MultiStepProgressBar";

class MainBusinessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      password: "",
      fullname: "",
      personal_phone: "",
      userType: "B",
      address: "",
      business_phone: "",
      business_email: "",
      business_name: "",
      business_description: "",
      businessType: "",
      services: [],
      products: [],
      photo_gallery: [],
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);
    this.handleServices = this.handleServices.bind(this);
    this.deleteServicesHandler = this.deleteServicesHandler.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.deleteProductHandler = this.deleteProductHandler.bind(this);
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
  handleBusinessType(type) {
    this.setState((state) => {
      state.businessType = type;
    });
  }
  handleServices(serviceType, name, price, duration, id) {
    this.setState((state) => {
      const services = [
        ...state.services,
        { serviceType, name, price, duration, id },
      ];

      return {
        services,
      };
    });
  }
  deleteServicesHandler = (serviceId) => {
    this.setState((state) => {
      const services = state.services.filter(
        (service) => service.id !== serviceId
      );

      return {
        services,
      };
    });
  };

  handleProducts(productId, price, description, name, quantity) {
    this.setState((state) => {
      const products = [
        ...state.products,
        { productId, price, description, name, quantity },
      ];

      return {
        products,
      };
    });
  }

  deleteProductHandler = (serialID) => {
    this.setState((state) => {
      const products = state.products.filter(
        (product) => product.productId !== serialID
      );

      return {
        products,
      };
    });
  };

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      fullname,
      password,
      business_phone,
      address,
      businessType,
      business_name,
      business_email,
      services,
      business_description,
    } = this.state;
    services.forEach((service, index) => {

      let servicesString = "";

      servicesString += `Service ${index + 1}: \n`;
      servicesString += `Service Type: ${service.serviceType} \n`;
      servicesString += `Name: ${service.name} \n`;
      servicesString += `Price: ${service.price} \n`;
      servicesString += `Duration: ${service.duration} \n`;
      servicesString += `ID: ${service.id} \n`;
      servicesString += "---------------------- \n";
    });

    console.log("Services:");
    services.forEach((service, index) => {
      console.log(`Service ${index + 1}:`);
      console.log(`Service Type: ${service.serviceType}`);
      console.log(`Name: ${service.name}`);
      console.log(`Price: ${service.price}`);
      console.log(`Duration: ${service.duration}`);
      console.log(`ID: ${service.id}`);
      console.log("----------------------");
    });

    alert(`Your registration detail: \n 
    "personal info:"\n
      Email: ${email} \n 
      fullname: ${fullname} \n
      Password: ${password}\n
      address: ${address}\n

    "business info:"\n
    businessType: ${businessType}\n
      business_phone: ${business_phone}\n
      business_email:${business_email}\n
      business_name:${business_name}\n
      description:${business_description}\n
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
      <Modal >

        <form className="pb-5" onSubmit={ this.handleSubmit }>
          <div class="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
            <button type="button" class="btn-close" aria-label="Close" onClick={ this.props.onClose }></button>

          </div>
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
              />
              <BusinessInfo
                currentStep={ this.state.currentStep }
                handleChange={ this.handleChange }
                handleBusinessType={ this.handleBusinessType }
              />
              <Services
                currentStep={ this.state.currentStep }
                handleServices={ this.handleServices }
                deleteServicesHandler={ this.deleteServicesHandler }
                services={ this.state.services }
              />
              <Products
                currentStep={ this.state.currentStep }
                handleProducts={ this.handleProducts }
                deleteProductHandler={ this.deleteProductHandler }
                products={ this.state.products }
              />
            </CardBody>
            <CardFooter className="d-flex justify-content-around">
              { this.previousButton }
              { this.nextButton }
              { this.submitButton }
            </CardFooter>
          </Card>
        </form>
      </Modal>
    );
  }
}

export default MainBusinessForm;
