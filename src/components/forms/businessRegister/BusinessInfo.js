import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Input, Label } from "reactstrap";

const BusinessInfo = (props) => {
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ selectedBusinessType, setSelectedBusinessType ] = useState(null);

  useEffect(() => {
    if (props.profileImg === '') {
      setSelectedImage(null)
    } else {
      setSelectedImage(props.profileImg)
    }
  }, [ props.profileImg ])

  useEffect(() => {
    if (props.formInput.businessType) {
      setSelectedBusinessType({
        value: props.formInput.businessType,
        label: props.formInput.businessType,
      });
    }
  }, [ props.formInput.businessType ]);

  const handleBusinessTypeChange = (selectedOption) => {
    setSelectedBusinessType(selectedOption);

    props.handleBusinessType(selectedOption.value);
  };

  const options = [
    { value: "barber shop", label: "Barber Shop", name: "businessType" },
    { value: "nail tech", label: "Nail Technician", name: "businessType" },
    { value: "spa", label: "Spa", name: "businessType" },
    { value: "hair salon", label: "Hair Salon", name: "businessType" },
    { value: "makeup artist", label: "Makeup Artist", name: "businessType" },
    { value: "esthetician", label: "Esthetician", name: "businessType" },
    { value: "massage therapist", label: "Massage Therapist", name: "businessType" },
    { value: "tanning salon", label: "Tanning Salon", name: "businessType" },
    { value: "lash technician", label: "Lash Technician", name: "businessType" },
    { value: "waxing studio", label: "Waxing Studio", name: "businessType" },
    { value: "microblading studio", label: "Microblading Studio", name: "businessType" },
    { value: "skin care clinic", label: "Skin Care Clinic", name: "businessType" },
    { value: "other", label: "Other", name: "businessType" },
  ];

  const inputs = [
    {
      id: "business_name",
      label: "Business Name",
      placeholder: "Enter your business name",
      name: "business_name",
      errorMessage: "must provide a business name",
      pattern: "^[a-zA-Z0-9 ]+$",
      required: true,
      type: "text",
    },
    {
      id: "address",
      label: "Business Address",
      placeholder: "Enter business address",
      name: "address",
      errorMessage: "must provide a business address",
      pattern: "^[a-zA-Z0-9 ]+$",
      required: true,
      type: "text",
    },
    {
      id: "business_description",
      label: "Business Description",
      placeholder: "Enter business description",
      name: "business_description",
      required: true,
      type: "text",
    },
  ];

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      <p className="text-center display-6">Business Information</p>
      <form className="form-check p-0">
        { inputs.map((input) => (
          <div key={ input.id }>
            <Label className="mt-2 mb-0" for={ input.name }>
              { input.label }
            </Label>
            <Input
              type={ input.type }
              name={ input.name }
              placeholder={ input.placeholder }
              value={ props.formInput[ input.name ] }
              onChange={ props.handleChange }
              invalid={ props.errors[ input.name ] !== undefined }
            />
            { props.errors[ input.name ] && (
              <p
                style={ {
                  fontSize: "12px",
                  padding: "3px",
                  color: "red",
                } }
              >
                { props.errors[ input.name ] }
              </p>
            ) }
          </div>
        )) }

        <div className="pt-2 w-50 ">
          <Select
            name="BusinessType"
            options={ options }
            value={ selectedBusinessType }
            onChange={ handleBusinessTypeChange }
            autoFocus={ true }
            size="3"
            className="custom-select text-center form-control form-select-sm"
            placeholder="Select business type"
          />
          <p
            style={ {
              fontSize: "12px",
              padding: "3px",
              color: "red",
            } }
          >
            { props.errors[ "businessType" ] }
          </p>
        </div>

        <Label className="custom-file-label" for="logo">
          Upload logo
        </Label>
        <div className="d-flex flex-column gap-2">
          <input
            className="custom-file-input"
            type="file"
            name="profileImg"
            label="choose image"
            onChange={ props.handleInsertImage }
          />
          { props.profileImg && (
            <div className="d-flex justify-content-around">

              <img
                alt="not found"
                width={ "50px" }
                height={ "50px" }
                src={ `data:image/jpeg;base64,${selectedImage}` }
              />
              <br />
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={ props.handleDeleteImage }
              >
                Remove
              </button>
            </div>
          ) }
        </div>
      </form>
    </>
  );
};

export default BusinessInfo;