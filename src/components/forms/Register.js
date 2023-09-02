import { useState, useContext } from "react";
import Modal from "../UI/Modal";
import FormInput from "./FormInput";
import { PopupMessageContext } from "../../PopupMessage";
import Select from "react-select";

import { Label } from "reactstrap";

const Register = (props) => {

  const { showMessage } = useContext(PopupMessageContext)

  const [ previewUrl, setPreviewUrl ] = useState("");
  const [ formValues, setformValues ] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    isBusiness: false,
    profileImg: "",
    securityQuestion: {
      question: "",
      answer: "",
    }

  });

  const securityQuestions = [
    {
      label: "What is your mother's maiden name?",
      value: "What is your mother's maiden name?",
    },
    {
      label: "What was the name of your first pet?",
      value: "What was the name of your first pet?",
    },
    {
      label: "What is your favorite book?",
      value: "What is your favorite book?",
    },
    {
      label: "In what city were you born?",
      value: "In what city were you born?",
    },
  ];

  const onChangeSecurityQuestion = (selectedOption) => {
    setformValues({
      ...formValues,
      securityQuestion: {
        ...formValues.securityQuestion,
        question: selectedOption.value,
      },
    });
  };

  const onChangeSecurityAnswer = (e) => {
    setformValues({
      ...formValues,
      securityQuestion: {
        ...formValues.securityQuestion,
        answer: e.target.value,
      },
    });
  };
  const DBreq = async (e) => {
    try {
      const requestBody = {
        email: formValues.email,
        password: formValues.password,
        fullname: formValues.fullname,
        phoneNumber: formValues.phoneNumber,
        userType: formValues.userType,
        isBusiness: formValues.isBusiness,
        profileImg: formValues.profileImg,
        securityQuestion: formValues.securityQuestion,
      };

      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      showMessage(data.message, data.type);
      if (data.ok) {
        props.onClose();
      }
    } catch (error) {
      showMessage('No Connection To Server, Try Again Later', 'Error')
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await DBreq();
  };

  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "full name",
      errorMessage: "fullname shouldn't include any special character!",
      label: "Fullname",
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
      type: "password",
      placeholder: "Password",
      label: "Password",
      pattern: `(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`,
      required: true,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: formValues.password,
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

  const onFileChange = (e) => {
    const selectedFile = e.target.files[ 0 ];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setformValues({
          ...formValues,
          profileImg: reader.result.split(",")[ 1 ], // Save the base64 string
        });
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Modal>

      <div className="d-flex flex-row justify-content-end p-1 w-100 p-0 ">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={ props.showConfirmation }
        ></button>
      </div>

      <p className="text-center display-6">Register</p>
      <form className=" p-1" onSubmit={ submitHandler }>
        <div className="d-flex justify-content-center">
          <div className="card mb-4">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <img
                className="w-50 img-fluid mb-4"
                src={ previewUrl || "http://bootdey.com/img/Content/avatar/avatar1.png" }
                alt=""
              />

              <div className="d-flex flex-wrap form-group">
                <input title="a" type="file" name="profileImg" onChange={ onFileChange } />
              </div>
            </div>
          </div>
        </div>
        { inputs.map((input) => (
          <FormInput
            key={ input.id }
            { ...input }
            value={ formValues[ input.name ] }
            onChange={ onChange }
          />
        )) }
        <Label for="security question" >Security question</Label>
        <Select
          name="security question"
          options={ securityQuestions }
          onChange={ onChangeSecurityQuestion }
          className="custom-select text-center form-control form-select-sm"
          placeholder="choose a security question"
          required={ true }
        />

        <FormInput
          key={ 6 }
          name="securityAnswer"
          type="text"
          placeholder="Your answer"
          label="Security answer"
          required={ true }
          value={ formValues.securityQuestion.answer }
          onChange={ onChangeSecurityAnswer }
        />
        <div className="row m-2  pt-4">

          <button type="submit" className="btn btn-primary btn-block mb-4">
            submit
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default Register;
