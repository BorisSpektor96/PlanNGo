import { useState } from "react";
import Modal from "../UI/Modal";
import FormInput from "./FormInput";

const Register = (props) => {
  const [ RememberMe, RememberMehandler ] = useState(false);

  const [ formValues, setformValues ] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "user",
  });

  const inputs = [
    {
      id: 1,
      name: "fullName",
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
      pattern: `(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`,
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

  const RememberMeCheckbox = () => {
    RememberMehandler(!RememberMe);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  const onChange = (e) => {
    setformValues({ ...formValues, [ e.target.name ]: e.target.value });
  };
  return (
    <Modal>
      <div class="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          dal
          onClick={ props.onClose }
        ></button>
      </div>

      <p className="text-center display-6">Register</p>
      <form class=" p-4" onSubmit={ submitHandler }>
        { inputs.map((input) => (
          <FormInput
            key={ input.id }
            { ...input }
            value={ formValues[ input.name ] }
            onChange={ onChange }
          />
        )) }
        <div className="row mb-4">
          <div className="col d-flex ">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="RememberMe"
                id="form2Example31"
                checked
              />
              <label
                className="form-check-label"
                for="form2Example31"
                onChange={ RememberMeCheckbox }
              >
                Remember me
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">
            submit
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default Register;
