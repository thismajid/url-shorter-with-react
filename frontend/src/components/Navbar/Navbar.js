import { Link } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import "./navbar.css";

const Navbar = ({ auth, onClickLogout, user }) => {
  console.log(window.location.pathname);
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
                    href="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://github.com/mdo.png"
                      alt=""
                      width="32"
                      height="32"
                      className="rounded-circle me-2"
                    />
                    <strong>
                      {user && user.firstname} {user && user.lastname}
                    </strong>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
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
