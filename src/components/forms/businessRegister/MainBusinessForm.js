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
import Modal from "../../UI/Modal";
import dayjs from "dayjs";
import BusinessInfo from "./BusinessInfo";
import PersonalInfo from "./PersonalInfo";
import Products from "./Products";
import Services from "./Services";
import MultiStepProgressBar from "./MultiStepProgressBar";
import AppointmentsDef from "./AppointmentsDef";

import { PopupMessageContext } from "../../../PopupMessage";

class MainBusinessForm extends Component {

  static contextType = PopupMessageContext;


  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      password: "",
      fullname: "",
      phoneNumber: "",
      isBusiness: true,
      address: "",
      business_name: "",
      business_description: "",
      businessType: "",
      services: [],
      products: [],
      profileImg: null,
      errors: {},
      reviews: [],
      securityQuestion: {
        question: "",
        answer: "",
      },

      appointmentsDef: {
        fixedBreak: [],
        fixedDaysOff: [],
        OneTimeDayOff: [],
        appointments: [],
        businessHours: {
          start: "",
          end: "",
        },
      },


    };
    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);
    this.handleServices = this.handleServices.bind(this);
    this.deleteServicesHandler = this.deleteServicesHandler.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.deleteProductHandler = this.deleteProductHandler.bind(this);
    this.handleBusinessType = this.handleBusinessType.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.handleInsertImage = this.handleInsertImage.bind(this);
    this.handleAddBreak = this.handleAddBreak.bind(this);
    this.handleDeleteBreak = this.handleDeleteBreak.bind(this);
    this.handleDayCheckboxChange = this.handleDayCheckboxChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  // Use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    const { currentStep } = this.state;
    if (name === "question") {
      this.setState((prevState) => ({
        formInput: {
          ...prevState.formInput,
          securityQuestion: {
            ...prevState.formInput.securityQuestion,
            question: value,
          },
        },
      }));
    } else if (name === "answer") {
      this.setState((prevState) => ({
        formInput: {
          ...prevState.formInput,
          securityQuestion: {
            ...prevState.formInput.securityQuestion,
            answer: value,
          },
        },
      }));
    }

    if (currentStep === 1) {
      this.setState((prevState) => ({
        ...prevState,
        fullname: name === "fullname" ? value : prevState.fullname,
        email: name === "email" ? value : prevState.email,
        password: name === "password" ? value : prevState.password,
        confirmPassword:
          name === "confirmPassword" ? value : prevState.confirmPassword,
        phoneNumber: name === "phoneNumber" ? value : prevState.phoneNumber,
      }));
    } else if (currentStep === 2) {
      this.setState((prevState) => ({
        ...prevState,
        business_name:
          name === "business_name" ? value : prevState.business_name,
        business_description:
          name === "business_description"
            ? value
            : prevState.business_description,
        address: name === "address" ? value : prevState.address,
        businessType: name === "businessType" ? value : prevState.businessType,
      }));
    }
  }


  checkEmailExists = async (email) => {
    try {
      const response = await fetch("http://localhost:3001/users/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      return data.exists; // Assuming the response from the server contains a field 'exists' indicating email existence
    } catch (error) {
      this.context.showMessage('Email existence check failed', 'Error')
      return false;
    }
  };

  validateFields = async () => {
    const { currentStep, ...formData } = this.state;
    let errors = {};

    // Check the fields based on the current step
    if (currentStep === 1) {
      const emailExists = await this.checkEmailExists(formData.email);
      if (emailExists) {
        errors.email = "Email already exists";
      }
      if (formData.fullname.trim() === "") {
        errors.fullname = "Full Name is required";
      }
      if (formData.email.trim() === "") {
        errors.email = "Email is required";
      }
      if (
        !/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
          formData.password
        )
      ) {
        errors.password =
          "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!";
      }
      if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = "Passwords don't match!";
      }
      if (
        !/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/.test(
          formData.phoneNumber
        )
      ) {
        errors.phoneNumber = "Invalid phone number.";
      }

      if (!formData.securityQuestion.question) {
        errors.securityQuestion = "Security question is required";
      }
      if (!formData.securityQuestion.answer) {
        errors.securityAnswer = "Security answer is required";
      }
      if (!formData.securityQuestion.question) {
        errors.securityQuestion = "Security question is required";
      }
      if (!formData.securityQuestion.answer) {
        errors.securityAnswer = "Security answer is required";
      }
    } else if (currentStep === 2) {
      if (formData.business_name.trim() === "") {
        errors.business_name = "Business Name is required";
      }
      if (formData.address.trim() === "") {
        errors.address = "address is required";
      }
      if (!formData.businessType) {
        errors.businessType = "choose business type";
      }
    }

    // Set the errors in the state
    this.setState({ errors });

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };


  handleBusinessType(type) {
    this.setState({ businessType: type });

    // Clear the businessType error when the user selects a value
    if (this.state.errors[ "businessType" ]) {
      const errors = { ...this.state.errors };
      errors.businessType = "";
      this.setState({ errors });
    }
  }


  handleAnswerChange(answer) {
    this.setState((prevState) => ({
      securityQuestion: {
        ...prevState.securityQuestion,
        answer: answer,
      },
    }));
  }

  handleQuestionChange(question) {
    this.setState((prevState) => ({
      securityQuestion: {
        ...prevState.securityQuestion,
        question: question,
      },
    }));
    if (this.state.errors[ "securityQuestion" ]) {
      const errors = { ...this.state.errors };
      errors.securityQuestion = "";
      this.setState({ errors });
    }
  }


  handleServices(name, price, duration) {
    price = parseFloat(price)
    duration = parseFloat(duration)

    this.setState((state) => {
      const services = [
        ...state.services,
        { name, price, duration },
      ];

      return {
        services,
      };
    });
  }

  deleteServicesHandler = (serviceToDelete) => {
    this.setState((prevState) => {
      const updatedServices = prevState.services.filter(
        (service) => service !== serviceToDelete
      );
      return {
        services: updatedServices,
      };
    });
  };
  handleInsertImage(event) {
    const imageFile = event.target.files[ 0 ];

    if (!imageFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result.split(",")[ 1 ]; // Extract the base64 data part
      this.setState({ profileImg: imageData }); // Set the base64 string in the state
    };

    reader.readAsDataURL(imageFile); // Use readAsDataURL to read the file as base64 data
    console.log(this.state.profileImg)
  }

  handleDeleteImage = () => {
    this.setState({ profileImg: null })
  };

  handleProducts(price, description, name, quantity, lables, photoFile) {
    price = parseFloat(price)
    quantity = parseInt(quantity)

    const reader = new FileReader();
    // console.log("Price Type:", typeof price);
    reader.onload = () => {
      const photoData = reader.result.split(",")[ 1 ]; // Extract the base64 data part

      this.setState((state) => {
        const products = [
          ...state.products,
          {
            price,
            description,
            name,
            quantity,
            lables,
            photo: photoData, // Set the base64 string instead of the Blob
          },
        ];
        return {
          products,
        };
      });
    };

    if (photoFile) {
      reader.readAsDataURL(photoFile); // Use readAsDataURL to read the file as base64 data
    }
  }

  deleteProductHandler = (productToDelete) => {
    this.setState((prevState) => {
      const updatedProducts = prevState.products.filter(
        (product) => product !== productToDelete
      );
      return {
        products: updatedProducts,
      };
    });
  };

  /*********************AppointmentsDef*********************/
  handleOpeningStartTimeChange = (value) => {
    this.setState((prevState) => ({
      appointmentsDef: {
        ...prevState.appointmentsDef,
        businessHours: {
          ...prevState.appointmentsDef.businessHours,
          start: value,
        },
      },
    }));
  };

  // Add a separate function to handle changes in opening end time
  handleOpeningEndTimeChange = (value) => {
    this.setState((prevState) => ({
      appointmentsDef: {
        ...prevState.appointmentsDef,
        businessHours: {
          ...prevState.appointmentsDef.businessHours,
          end: value,
        },
      },
    }));
  };

  handleAddBreak = (startTime, endTime) => {
    const formattedStartTime = dayjs(startTime, "HH:mm", true);
    const formattedEndTime = dayjs(endTime, "HH:mm", true);

    if (formattedEndTime.isValid() && formattedEndTime.isAfter(formattedStartTime)) {
      const breakTimeRange = {
        start: formattedStartTime.format("HH:mm"),
        end: formattedEndTime.format("HH:mm"),
      };
      this.state.appointmentsDef.fixedBreak.push(breakTimeRange)

      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          break: "", // Clear any previous fixedBreak error
        },
      }));
    } else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          break: "Invalid break time range",
        },
      }));
    }
  };

  handleDeleteBreak = (index) => {
    this.setState((prevState) => {
      const updatedBreaks = [ ...prevState.appointmentsDef.fixedBreak ];
      updatedBreaks.splice(index, 1);
      return {
        ...prevState,
        appointmentsDef: {
          ...prevState.appointmentsDef,
          fixedBreak: updatedBreaks,
        },
      };
    });
  };

  handleDayCheckboxChange = (day) => {
    this.setState(
      (prevState) => {
        if (prevState.appointmentsDef.fixedDaysOff.includes(day)) {
          return {
            ...prevState,
            appointmentsDef: {
              ...prevState.appointmentsDef,
              fixedDaysOff: prevState.appointmentsDef.fixedDaysOff.filter(
                (selectedDay) => selectedDay !== day
              ),
            },
          };
        } else {
          return {
            ...prevState,
            appointmentsDef: {
              ...prevState.appointmentsDef,
              fixedDaysOff: [ ...prevState.appointmentsDef.fixedDaysOff, day ],
            },
          };
        }
      },
    );
  };
  /*********************AppointmentsDef*********************/

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentStep, errors, confirmPassword, ...formData } = this.state;
    if (this.state.appointmentsDef.businessHours.start === "" || this.state.appointmentsDef.businessHours.end === "" || this.state.appointmentsDef.businessHours.end <= this.state.appointmentsDef.businessHours.start) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          businessHours: "Please enter valid business hours",
        },
      }));
      return;
    } else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          businessHours: "", // Clear business hours error
        },
      }));
    }

    try {
      const response = await fetch(
        "http://localhost:3001/business/newBusinessUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      this.props.onClose();
      const data = await response.json();

      this.context.showMessage(data.message, data.type)

    } catch (error) {
      this.context.showMessage('No Connection To Server, Try Again Later', 'Error')
    }
  };
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;

    // If the current step is 1 or 2, then add one on "next" button click
    if (currentStep > 0 && currentStep < 5) {
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
  handleNext = async () => {
    // Validate the form fields
    const isValid = await this.validateFields();

    if (isValid) {
      // Move to the next step if the form is valid
      this._next();
    }
  };

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button

    // Determine the CSS class for the "next" button based on isValidPassword
    const buttonClass = "primary float-right";

    // If the current step is not 3, render the "next" button with the appropriate style
    if (currentStep < 5) {
      return (
        <Button color={ buttonClass } onClick={ this._next }>
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
    if (currentStep > 4) {
      return <Button color="primary float-right">Submit</Button>;
    }
    // ...else render nothing
    return null;
  }

  render() {
    const { currentStep } = this.state;

    return (
      <Modal>
        <Form className="pb-1" onSubmit={ this.handleSubmit }>
          <div class="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={ this.props.showConfirmation }
            ></button>
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
                errors={ this.state.errors }
                formInput={ this.state }
                handleAnswerChange={ this.handleAnswerChange }
                handleQuestionChange={ this.handleQuestionChange }
              />

              <BusinessInfo
                currentStep={ this.state.currentStep }
                handleChange={ this.handleChange }
                handleBusinessType={ this.handleBusinessType }
                handleInsertImage={ this.handleInsertImage }
                handleDeleteImage={ this.handleDeleteImage }
                profileImg={ this.state.profileImg }
                formInput={ this.state }
                errors={ this.state.errors } // Pass the errors object to the component
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
              <AppointmentsDef
                currentStep={ this.state.currentStep }
                appointmentsDef={ this.state.appointmentsDef }
                handleDayCheckboxChange={ this.handleDayCheckboxChange }
                handleAddBreak={ this.handleAddBreak }
                handleDeleteBreak={ this.handleDeleteBreak }
                businessHours={ this.state.appointmentsDef.businessHours } // Pass the businessHours object
                handleOpeningStartTimeChange={ this.handleOpeningStartTimeChange }
                handleOpeningEndTimeChange={ this.handleOpeningEndTimeChange }
                errors={ this.state.errors } // Pass the errors object to the component

              />
            </CardBody>
            <CardFooter className="d-flex justify-content-around">
              { this.previousButton }
              { currentStep < 5 && (
                <Button color="primary float-right" onClick={ this.handleNext }>
                  Next
                </Button>
              ) }
              { currentStep === 5 && (
                <Button color="primary float-right">Submit</Button>
              ) }
            </CardFooter>
          </Card>
        </Form>
      </Modal>
    );
  }
}
export default MainBusinessForm;