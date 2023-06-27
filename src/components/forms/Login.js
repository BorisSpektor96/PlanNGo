import Modal from "../UI/Modal";
import "bootstrap/dist/css/bootstrap.css";
import FormInput from "./FormInput";
import { useState } from "react";

const Login = (props) => {
  const [ formValues, setformValues ] = useState({
    email: "",
    password: "",
  });

  const [ user, setUser ] = useState({})

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
      pattern: `(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`,
      required: true,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
  ];
  const submitHandler = async (e) => {
    e.preventDefault();
    const loggedIn = await userLogin();

    if (loggedIn) {
      console.log('Logged in');
      window.location.href = '/BusinessesMenu';
    } else {
      console.log('Bad information');
      window.location.href = '/Welcome';
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
      if (response != null) {
        let data = await response.json();
        await setUser(data);

        await localStorage.setItem('userData', JSON.stringify(data, 'empty'));

        console.log("User:" + localStorage.getItem('userData'));
        return true
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      console.log(err);
    }
  }

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
      <form onSubmit={ submitHandler }>
        { inputs.map((input) => (
          <FormInput
            key={ input.id }
            { ...input }
            value={ formValues[ input.name ] }
            onChange={ onChange }
          />
        )) }
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                checked
              />
              <label className="form-check-label" for="form2Example31">
                { " " }
                Remember me{ " " }
              </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block mb-4"
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
        </div>
      </form>
    </Modal>
  );
};
export default Login;
