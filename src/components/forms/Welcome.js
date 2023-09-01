import { Fragment, useState, useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "./Welcome.module.css";
import MainBusinessForm from "./businessRegister/MainBusinessForm";
import CustomAlert from "../Calendar/CustomAlert ";

import { AuthContext } from '../../AuthContext';
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Welcome = () => {

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [ loginIsShown, setLoginIsShown ] = useState(false);
  const [ RegisterIsShown, setRegisterIsShown ] = useState(false);
  const [ BusinessRegisterIsShown, setBusinessRegisterIsShown ] = useState(false);
  const [ showConfirmation, setShowConfirmation ] = useState(false);

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  const showRegisterHandler = () => {
    setRegisterIsShown(true);
  };
  const showBusinessRegisterHandler = () => {
    setBusinessRegisterIsShown(true);
  };

  const hideFormHandler = () => {
    console.log('asdada')
    setRegisterIsShown(false);
    setLoginIsShown(false);
    setBusinessRegisterIsShown(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/Welcome')
    }
  }, [ isLoggedIn ])

  const handleAlertConfirm = () => {
    setShowConfirmation(false);
  };
  useEffect(() => {
    if (!showConfirmation) {
      setLoginIsShown(false)
      setRegisterIsShown(false)
      setBusinessRegisterIsShown(false)
    }
  }, [ showConfirmation ])

  useEffect(() => {
    console.log(showConfirmation)
  }, [ showConfirmation ])

  return (
    <Fragment>

      { showConfirmation && (
        <CustomAlert
          isOpen={ showConfirmation }
          toggle={ () => setShowConfirmation(false) }
          message="Are you sure you want to close? Any unsaved changes will be lost."
          onConfirm={ handleAlertConfirm }
        />
      ) }

      {
        loginIsShown &&
        <Login
          onClose={ hideFormHandler }
          hideForm={ hideFormHandler }
          handleAlertConfirm={ handleAlertConfirm }
        />
      }
      {
        RegisterIsShown &&
        <Register
          onClose={ hideFormHandler }
          hideForm={ hideFormHandler }
          handleAlertConfirm={ handleAlertConfirm }
        />
      }
      {
        BusinessRegisterIsShown &&
        <MainBusinessForm
          onClose={ hideFormHandler }
          hideForm={ hideFormHandler }
          handleAlertConfirm={ handleAlertConfirm }
        />
      }
      { isLoggedIn ?
        <div className={ styles.container }>
          <div className="header">
            <h1 className="m-0 p-0 header display-4">Welcome </h1>
          </div>
        </div>
        :
        <div className={ styles.container }>
          <div className="header">
            <h1 className="header display-4 text-center">Login / Register </h1>
          </div>

          <div className={ styles.Bcontainer }>
            <div className={ styles.B2 }>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={ showLoginHandler }
              >
                Login
              </button>
            </div>

            <div className={ styles.B2 }>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={ showRegisterHandler }
              >
                Register
              </button>
            </div>

            <div className={ styles.B2 }>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={ showBusinessRegisterHandler }
              >
                Business Register
              </button>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};
export default Welcome;
