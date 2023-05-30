import Modal from "../UI/Modal";
import "bootstrap/dist/css/bootstrap.css";

const Login = (props) => {

  const logIn = () => {
    props.btnLogIn(true);
    console.log("Login Component");
  }

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

      <form>
        <h1 className="display-4 text-center">Login </h1>

        <div className="form-outline mb-4">
          <label className="form-label" for="form2Example1">Email address</label>

          <input type="email" id="form2Example1" className="form-control" />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form2Example2">Password</label>

          <input type="password" id="form2Example2" className="form-control" />
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label className="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={ logIn } type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
        </div>

        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
        </div>

      </form>
    </Modal>
  );
};
export default Login;
