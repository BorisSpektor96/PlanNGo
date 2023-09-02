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
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [RegisterIsShown, setRegisterIsShown] = useState(false);
  const [BusinessRegisterIsShown, setBusinessRegisterIsShown] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const hideFormHandler = () => { setShowConfirmation(true)};

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/Welcome')
    }
  }, [isLoggedIn])

  const handleAlertConfirm = () => {
    setShowConfirmation(false);
    setRegisterIsShown(false);
    setLoginIsShown(false);
    setBusinessRegisterIsShown(false);
  };

  return (
    <Fragment>

      <CustomAlert
        isOpen={showConfirmation}
        toggle={() => setShowConfirmation(false)}
        message="Are you sure you want to close? Any unsaved changes will be lost."
        onConfirm={handleAlertConfirm}
      />

      {
        loginIsShown &&
        <Login
          onClose={() => setLoginIsShown(false)}
          showConfirmation={hideFormHandler}
        />
      }
      {
        RegisterIsShown &&
        <Register
        onClose={() => setRegisterIsShown(false)}
        showConfirmation={hideFormHandler} />
      }
      {
        BusinessRegisterIsShown &&
        <MainBusinessForm
        onClose={() => setBusinessRegisterIsShown(false)}
        showConfirmation={hideFormHandler} />
      }
      {isLoggedIn ?
        <div className={styles.container}>
          <div className="header">
            <h1 className="m-0 p-0 header display-4">Welcome </h1>
          </div>
        </div>
        :
        <div className={styles.container}>
          <div className="header">
            <h1 className="header display-4 text-center">Login / Register </h1>
          </div>

          <div className={styles.Bcontainer}>
            <div className={styles.B2}>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setLoginIsShown(true)}
              >
                Login
              </button>
            </div>

            <div className={styles.B2}>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setRegisterIsShown(true)}
              >
                Register
              </button>
            </div>

            <div className={styles.B2}>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setBusinessRegisterIsShown(true)}
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
