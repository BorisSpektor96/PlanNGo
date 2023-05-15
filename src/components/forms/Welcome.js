import { Fragment, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "./Welcome.module.css"

const Welcome = (props) => {
  const [ loginIsShown, setLoginIsShown ] = useState(false);
  const [ RegisterIsShown, setRegisterIsShown ] = useState(false);
  const showLoginHandler = (props) => {
    setLoginIsShown(true);
  };
  const showRegisterHandler = (props) => {
    setRegisterIsShown(true);
  };
  const hideFormHandler = (props) => {
    setRegisterIsShown(false);
    setLoginIsShown(false);
  };

  const setToLoggedIn = (value) => {
    props.setToLogin(value);
    console.log("Welcome Component");
  }

  return (
    <Fragment>
      { loginIsShown && <Login btnLogIn={ setToLoggedIn } onClose={ hideFormHandler } /> }
      { RegisterIsShown && <Register onClose={ hideFormHandler } /> }

      <div className={ styles.container }>

        <div className="header">
          <h1 className="display-4 text-center">Welcome </h1>
        </div>

        <div className={ styles.Bcontainer }>

          <div className={ styles.B1 }>
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
        </div>
      </div>
    </Fragment>
  );
};
export default Welcome;
