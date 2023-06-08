import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import Select from "react-select";

const BusinessInfo = (props) => {
  const [ selectedImage, setSelectedImage ] = useState(null);

  const handleRemoveImage = (index) => {
    const updatedImages = [ ...selectedImage ];
    updatedImages.splice(index, 1);
    setSelectedImage(updatedImages);
  };

  const options = [
    { value: "barber shop", label: "barber shop", name: "businessType" },
    { value: "nail tech", label: "nail tech", name: "businessType" },
    { value: "spa", label: "spa", name: "businessType" },
    { value: "other", label: "other", name: "businessType" },
  ];
  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      <p className="text-center display-6">Business Information</p>
      <FormGroup className="form-check p-0">
        <Label className="mt-2 mb-0" for="business_name">
          Business Name
        </Label>
        <Input
          type="text"
          name="business_name"
          id="business_name"
          placeholder="Enter your business name"
          value={ props.business_name } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />
        <Label className="mt-2 mb-0" for="business_phone">
          Business Phone Number
        </Label>
        <Input
          type="text"
          name="business_phone"
          id="business_phone"
          placeholder="Enter business phone number"
          value={ props.business_phone } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />
        <Label className="mt-2 mb-0" for="address">
          Business Address
        </Label>
        <Input
          type="text"
          name="address"
          id="address"
          placeholder="Enter business address"
          value={ props.address } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />
        <Label className="mt-2 mb-0" for="business_email">
          Business Email
        </Label>
        <Input
          type="text"
          name="business_email"
          id="business_email"
          placeholder="Enter business email address"
          value={ props.business_email } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />
        <Label className="mt-2 mb-0" for="business_description">
          business description
        </Label>
        <Input
          type="text"
          name="business_description"
          id="business_description"
          placeholder="Enter business description"
          value={ props.business_description } // Prop: The username input data
          onChange={ props.handleChange } // Prop: Puts data into the state
        />
        <div className="p-2">
          <Select
            options={ options }
            onChange={ (selectedOption) =>
              props.handleBusinessType(selectedOption.value)
            }
            autoFocus={ true }
            className="custom-select text-center form-control"
            placeholder="Select business type"
          ></Select>
        </div>
        <Label class="custom-file-label" for="photo_gallery">
          Upload pictures
        </Label>
        <div className="d-flex flex-column gap-2">
          <input
            className="custom-file-input"
            type="file"
            name="myImage"
            lable="choose image"
            onChange={ (event) =>
              props.handleInsertImage(Array.from(event.target.files))
            }
            multiple // Allow multiple file selection
          />

          { props.business_photo_gallery && (
            <div className="d-flex justify-content-around">
              {/* Display selected images */ }
              { props.business_photo_gallery.map((image, index) => (
                <div key={ index }>
                  <img
                    alt="not found"
                    width={ "50px" }
                    height={ "50px" }
                    src={ URL.createObjectURL(image) }
                  />
                  <br />
                  <button
                    className="btn btn-outline-danger"
                    onClick={ () => props.handleDeleteImage(index) }
                  >
                    Remove
                  </button>
                </div>
              )) }
            </div>
          ) }
        </div>
      </FormGroup>
    </>
  );
};
export default BusinessInfo;
