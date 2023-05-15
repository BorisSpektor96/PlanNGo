import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const PersonalInfo = (props) => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <p>Personal Information</p>
      <FormGroup>
        <Label for="fullname">fullname</Label>
        <Input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Enter your full name"
          value={props.fullname} // Prop: The fullname input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
        <Label for="personal_phone">phone number</Label>
        <Input
          type="text"
          name="personal_phone"
          id="personal_phone"
          placeholder="Enter your phone number"
          value={props.personal_phone} // Prop: The personal_phone input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
        <Label for="email">Email</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your Email"
          value={props.email} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
          <Label for="password">password</Label>
        <Input
          type="text"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={props.password} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup>
    </>
  );
};
export default PersonalInfo;
