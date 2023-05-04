import styles from "./Login.module.css";
import Modal from "../UI/Modal";
import "bootstrap/dist/css/bootstrap.css";

const Login = (props) => {

  const logIn = () => {
    props.btnLogIn(true);
    console.log("Login Component");
  }

  return (
    <Modal dal onClose={ props.onClose }>
      <form>
        <h1 class="display-4 text-center">Login </h1>

        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example1">Email address</label>

          <input type="email" id="form2Example1" class="form-control" />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example2">Password</label>

          <input type="password" id="form2Example2" class="form-control" />
        </div>

        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label class="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>

          <div class="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button onClick={ logIn } type="button" class="btn btn-primary btn-block mb-4">Sign in</button>

        <div class="text-center">
          <p>Not a member? <a href="#!">Register</a></p>

        </div>
      </form>
    </Modal>
  );
};
export default Login;
