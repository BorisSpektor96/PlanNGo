import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";

const BusinessInfo = (props) => {

  const [ selectedImage, setSelectedImage ] = useState(null);

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      <p className="text-center display-6">Business Information</p>
      <FormGroup className="form-check p-0">
        <div className="mb-2">
          <select onChange={ props.handleChange } className="custom-select text-center  form-control">
            <option selected>Choose Your Business Type</option>
            <option value={ props.type }>hair salon</option>
            <option value={ props.type } >nails</option>
            <option value={ props.type } >other</option>
          </select>
        </div>

        <Label className="mt-2 mb-0" for="business_name">Business Name</Label>
        <Input
          type="text"
          name="business_name"
          id="business_name"
          placeholder="Enter your business name"
          value={ props.business_name } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />

        <Label className="mt-2 mb-0" for="business_phone">Business Phone Number</Label>
        <Input
          type="text"
          name="business_phone"
          id="business_phone"
          placeholder="Enter business phone number"
          value={ props.business_phone } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />

        <Label className="mt-2 mb-0" for="address">Business Address</Label>
        <Input
          type="text"
          name="address"
          id="address"
          placeholder="Enter business address"
          value={ props.address } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />

        <Label className="mt-2 mb-0" for="business_email">Business Email</Label>
        <Input
          type="text"
          name="business_email"
          id="business_email"
          placeholder="Enter business email address"
          value={ props.business_email } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />

        <Label className="mt-2 mb-0" for="photo_gallery">Upload pictures</Label>

        <div className="d-flex flex-column gap-2">
          { selectedImage && (
            <div className="d-flex justify-content-around">
              <img
                alt="not found"
                width={ "50px" }
                height={ "50px" }
                src={ URL.createObjectURL(selectedImage) }
              />
              <br />
              <button className="btn btn-outline-danger" onClick={ () => setSelectedImage(null) }>Remove</button>
            </div>
          ) }
          <input
            type="file"
            name="myImage"
            lable="choose image"
            onChange={ (event) => {
              console.log(event.target.files[ 0 ]);
              setSelectedImage(event.target.files[ 0 ]);
            } }
          />
        </div>
      </FormGroup>
    </>
  );
};
export default BusinessInfo;
