import { useState } from "react";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";

import FormInput from "./FormInput";
const Register = (props) => {

  const navigate = useNavigate()

  const [ RememberMe, RememberMehandler ] = useState(false);
  const [ previewUrl, setPreviewUrl ] = useState("");
  const [ formValues, setformValues ] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "U",
    isBusiness: false,
    profileImg: {},
    favorites: [],
  });



  const DBreq = async (e) => {
    try {
      const formData = new FormData();
      formData.append("profileImg", formValues.profileImg);
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);
      formData.append("fullName", formValues.fullName);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("userType", formValues.userType);
      formData.append("isBusiness", formValues.isBusiness);

      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("User registered successfully:", data);

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formValues);
    await DBreq();
    window.location.href = '/Welcome';
  };

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

  const onChange = (e) => {
    setformValues({ ...formValues, [ e.target.name ]: e.target.value });
  };
  const onFileChange = (e) => {
    const selectedFile = e.target.files[ 0 ];
    if (selectedFile) {
      setformValues({ ...formValues, profileImg: selectedFile });
      const reader = new FileReader();
      reader.onloadend = () => {
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
          onClick={ props.onClose }
        ></button>
      </div>

      <p className="text-center display-6">Register</p>
      <form className=" p-1" onSubmit={ submitHandler }>
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <img
                className="img-fluid mb-4"
                src={ previewUrl || "http://bootdey.com/img/Content/avatar/avatar1.png" }
                alt=""
              />

              <div className="form-group">
                <input type="file" name="profileImg" onChange={ onFileChange } />
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

        <div className="row mb-4">
          <div className="col d-flex ">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="RememberMe"
                id="form2Example31"
              />
              <label
                className="form-check-label"
                htmlFor="form2Example31"
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
