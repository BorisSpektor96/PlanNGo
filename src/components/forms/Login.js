import Modal from "../UI/Modal";
import "bootstrap/dist/css/bootstrap.css";
import FormInput from "./FormInput";
import { useState, useEffect, useContext } from "react";

// ******************
import { ProfileInfoContext } from '../../ProfileInfoContext'
// ******************

const Login = (props) => {

  // ******************
  const { profileInfo, dispatch } = useContext(ProfileInfoContext);
  const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);
  const [ data, setData ] = useState();

  const [ formValues, setformValues ] = useState({
    email: "",
    password: "",
  });
  // ******************

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData !== 'undefined') {
      setLocalProfileInfo(JSON.parse(storedData));
    }
  }, [ profileInfo ]);

  useEffect(() => {
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: data });
  }, [ data ]);

  useEffect(() => {
    setLocalProfileInfo(data);
    localStorage.setItem('userData', JSON.stringify(data))
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: data });
    console.log(profileInfo)
    console.log(data)
  }, [ data ]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const isLoginSuccessful = await userLogin();

      if (isLoginSuccessful) {
        console.log('Good information');
        window.location.href = '/BusinessesMenu'
      } else {
        console.log('Bad information');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const setToLoggedIn3 = () => {
    props.setToLoggedIn()
    props.hideForm()
  }

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

      if (response.status === 200) {
        const responseData = await response.json();
        setData(responseData);

        if (responseData !== null && responseData !== 'undefined' && responseData !== undefined) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log('Login failed. Status:', response.status);
        return false;
      }
    } catch (err) {
      console.log('Error:', err);
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
          // dal
          onClick={ props.onClose }
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
        <div className="row mb-4">
          <div className="col">
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                name="form2Example31"
              // checked
              />
              <label className="form-check-label" htmlFor="form2Example31">
                { " " }
                Remember me{ " " }
              </label>
            </div>
          </div>

          <div className="col text-end mt-2">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
          >
            Sign in
          </button>
        </div>

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
