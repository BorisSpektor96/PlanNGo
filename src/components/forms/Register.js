import { useState } from "react";
import Modal from "../UI/Modal";
import MainBusinessForm from "./businessRegister/MainBusinessForm";

const Register = (props) => {
  const [ isBusiness, isBusinesshandler ] = useState(false);
  const [ RememberMe, RememberMehandler ] = useState(false);

  const isBusinessCheckbox = () => {
    isBusinesshandler(!isBusiness);
  };

  const RememberMeCheckbox = () => {
    RememberMehandler(!RememberMe);
  };


  return (
    <Modal onClose={ props.onClose }>
      { !isBusiness && <form >
        <h1 className="display-4 text-center">Register</h1>
        <div id="scrollb" data-spy="scroll" data-bs-target="#scrollb">

          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">
              full name
            </label>

            <input type="email" id="form2Example1" className="form-control" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">
              Email address
            </label>

            <input type="email" id="form2Example1" className="form-control" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example2">
              Password
            </label>

            <input type="password" id="form2Example2" className="form-control" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">
              phone number
            </label>

            <input type="email" id="form2Example1" className="form-control" />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={ RememberMe }
                  id="form2Example31"
                  onChange={ RememberMeCheckbox }
                />
                <label className="form-check-label" for="form2Example31">

                  Remember me
                </label>
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={ isBusiness }
                  onChange={ isBusinessCheckbox }
                />
                bussiness ?
              </label>
            </div>


          </div>

          <button type="button" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="text-center">
            <p>
              already a member? <a href="#!">Login</a>
            </p>
          </div>
        </div>
      </form> }

      {/* --------------------------bussiness part--------------------------------------*/ }

      { isBusiness && (
        <MainBusinessForm></MainBusinessForm>

      ) }
      {/* --------------------------bussiness part--------------------------------------*/ }
    </Modal>
  );
};
export default Register;
