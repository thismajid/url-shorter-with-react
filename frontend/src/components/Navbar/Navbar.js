import { Link } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import "./navbar.css";

const Navbar = ({ auth, onClickLogout, user }) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md bg-faded justify-content-center">
      <div className="d-flex w-50 mr-auto">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-2">
          {!auth ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt style={{ width: "20px" }} />
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-sliders-h fa-fw"></i>
                        {user && user.firstname} {user && user.lastname}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link to="/dashboard" className="dropdown-item">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="dropdown-item"
                        onClick={onClickLogout}
                      >
                        Logout <FaSignOutAlt className="ms-1" />
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </ul>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsingNavbar3"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
        <ul className="navbar-nav w-100 justify-content-center">
          <li className="navbar-brand  nav-item">
            <a className="nav-link" href="/">
              URL Shorter
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
          <li className="nav-item m-2">
            <a className="nav-link" href="/">
              Home Page
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
