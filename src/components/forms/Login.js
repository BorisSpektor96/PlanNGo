import Modal from "../UI/Modal";
import "bootstrap/dist/css/bootstrap.css";
import FormInput from "./FormInput";
import { useState, useContext } from "react";
import ChangePassword from "./ChangePassword"
import { AuthContext } from '../../AuthContext';
import { PopupMessageContext } from "../../PopupMessage";

const Login = (props) => {

  const { showMessage } = useContext(PopupMessageContext)
  const { login } = useContext(AuthContext);
  const [ showChangePassword, setShowChangePassword ] = useState(false)
  const [ bType, setBType ] = useState("");

  const showChangePasswordHandler = () => {
    setShowChangePassword(!showChangePassword);

  };

  const [ formValues, setformValues ] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await userLogin();

    } catch (error) {
      console.log('Error:', error);
    }
  };

  const userLogin = async () => {
    try {
      let response = await fetch('http://localhost:3001/users/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password
        })
      });
      const data = await response.json();

      if (response.status === 200) {
        if (data !== null && data !== 'undefined' && data !== undefined) {
          showMessage(data.message, data.type)
          login(data.user)
          props.onClose()
          return true;
        } else {
          return false;
        }
      } else {
        showMessage(data.message, data.type)
        return false;
      }
    } catch (err) {
      showMessage('No Connection To Server, Try Again Later', 'Error')
      return false;
    }
  };

  const onChange = (e) => {
    setformValues({ ...formValues, [ e.target.name ]: e.target.value });
  };

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
      required: true,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
  ];

  return (
    <Modal>
      <div className="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={ props.showConfirmation }
        ></button>
      </div>

      <p className="text-center display-6">Login</p>

      <form onSubmit={ submitHandler }>
        { inputs.map((input) => (
          <FormInput
            key={ input.id }
            { ...input }
            value={ formValues[ input.name ] }
            onChange={ onChange }
          />
        )) }


        <div className="d-flex justify-content-center pt-2">
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
          >
            Sign in
          </button>
        </div>

        <div className="text-center">

          forgot password?
          <button
            className=" btn btn-link"
            type="button"
            onClick={ () => {
              showChangePasswordHandler();
              setBType("forgotPasswordLogin");
            } }
          >
            click here
          </button>
        </div>

      </form>

      { showChangePassword && <ChangePassword onClose={ showChangePasswordHandler } bType={ bType } /> }

    </Modal>
  );
};
export default Login;
