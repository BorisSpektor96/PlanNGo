import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Navbar = () => {
  return (
    <nav class="d-flex navbar navbar-expand-lg navbar-dark bg-success display-7">
      <div class="collapse navbar-collapse d-flex justify-content-lg-between" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto ml-2">
          <li class="nav-item active">
            <Link class="nav-link" to="/businessesMenu">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Review">
              Schedule
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Welcome">
              Favorites
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Main">
              Massages
            </Link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <ul class="navbar-nav mr-auto mr-4  ">
            <li class="nav-item">
              <Link class="nav-link" to="/Main">
                Profile
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/Main">
                Logout
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </nav>
  );
};
export default Navbar;
