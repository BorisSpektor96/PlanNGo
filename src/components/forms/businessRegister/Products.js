import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
const Products = (props) => {
  if (props.currentStep !== 4) {
    return null;
  }

  return (
    <>
      <p className="display-6 text-center">Products</p>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          value={ props.password } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />
      </FormGroup>
    </>
  );
};
export default Products;
