import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


const Navbar = (props) => {

  const logOff3 = () => {
    props.setLogOut2(false)
    console.log("Navbar Component");
  }

  return (
    <nav class="d-flex navbar navbar-expand-lg navbar-dark bg-dark display-7 p-3">
      <div class="collapse navbar-collapse d-flex justify-content-lg-between" id="navbarToggleExternalContent">
        <ul class="navbar-nav mr-auto ml-2">
          <li class="nav-item">
            <Link class="nav-item nav-link" to="/businessesMenu">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Calendar">
              Schedule
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Welcome">
              Favorites
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/">
              Massages
            </Link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <ul class="navbar-nav">
            <li class="nav-item mx-1">
              <button class="btn btn-outline-primary" to="/">
                Profile
              </button>
            </li>
            <li class="nav-item mx-1">
              <button onClick={ logOff3 } type="button" class="btn btn-outline-danger">
                Logout
              </button>
            </li>
          </ul>
        </form>
      </div>
    </nav>
  );
};
export default Navbar;
