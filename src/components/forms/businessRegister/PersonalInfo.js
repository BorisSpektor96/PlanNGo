import React from "react";
import { Input, Label } from "reactstrap";

const PersonalInfo = (props) => {
  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "fullName",
      label: "fullName",
      errorMessage:
        "fullName should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      errorMessage: "Passwords don't match!",
      pattern: props.password,
    },
    {
      id: 5,
      name: "personal_phone",
      type: "text",
      placeholder: "personal_phone",
      label: "personal_phone",
      errorMessage: "Invalid phone number.",
      pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      required: true,
    },
  ];
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <>
      <p className="text-center display-6">Personal Information</p>
      <form>
        {inputs.map((input) => (
          <div key={input.id}>
            <Label className="mt-2 mb-0" for={input.name}>
              {input.label}
            </Label>
            <Input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={props.formInput[input.name]}
              onChange={props.handleChange}
              invalid={props.errors[input.name] !== undefined}
            />
            {props.errors[input.name] && (
              <p
                style={{
                  fontSize: "12px",
                  color: "red",
                }}
              >
                {props.errors[input.name]}
              </p>
            )}
          </div>
        ))}
      </form>
    </>
  );
};

export default PersonalInfo;
