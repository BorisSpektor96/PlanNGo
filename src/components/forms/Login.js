import Modal from "../UI/Modal";
import "bootstrap/dist/css/bootstrap.css";
import FormInput from "./FormInput";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// ******************
import { ProfileInfoContext } from '../../ProfileInfoContext'
// ******************

const Login = (props) => {
  const navigate = useNavigate()
  // ******************
  const { profileInfo, dispatch } = useContext(ProfileInfoContext);
  const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);
  const [ data, setData ] = useState();
  // ******************

  useEffect(() => {
    setLocalProfileInfo(profileInfo);
  }, [ profileInfo ])

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(data))
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: data });
  }, [ data ])

  const [ formValues, setformValues ] = useState({
    email: "",
    password: "",
  });


  const submitHandler = async (e) => {
    e.preventDefault();
    const loggedIn = await userLogin();
    console.log(data)
    console.log(profileInfo)
    if (loggedIn) {
      console.log('Logged in');
      // window.location.href = '/BusinessesMenu';
      // navigate('/BusinessesMenu')
    } else {
      console.log('Bad information');
      navigate('/Welcome')
      // window.location.href = '/Welcome';
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

      if (response.status === 200) {
        await setData(await response.json());
        if (data !== null) {
          setLocalProfileInfo(data)
          await dispatch({ type: 'UPDATE_PROFILE_INFO', payload: data });
          // localStorage.setItem('userData', JSON.stringify(data));
          return true;
        } else {
          localStorage.setItem('userData', null);
          return false
        }
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
