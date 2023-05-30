import { React, useState } from "react";
import FormInput from "../FormInput";

const PersonalInfo = (props) => {
  const [ formValues, setformValues ] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "Business",
  });
  if (props.currentStep !== 1) {
    return null;
  }

  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "fullName",
      errorMessage:
        "fullName should be 3-16 characters and shouldn't include any special character!",
      label: "fullName",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 3,
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
      required: true,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "text",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: props.password,
      required: true,
    },
    {
      id: 5,
      name: "phoneNumber",
      type: "text",
      placeholder: "phone number",
      errorMessage: "invalid phone number.",
      label: "phone number",
      pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    setformValues({ ...formValues, [ e.target.name ]: e.target.value });
  };

  return (
    <>
      <p className="text-center display-6">Personal Information</p>
      {/* <form> */ }
      { inputs.map((input) => (
        <FormInput
          key={ input.id }
          { ...input }
          let
          v={ formValues[ input.name ] }
          value={ props.v }
          onInput={ onChange }
          onChange={ props.handleChange }
        />
      )) }
      {/* </form> */ }
    </>
  );
};
export default PersonalInfo;
