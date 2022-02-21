import { Link } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ auth, onClickLogout, user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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

          <span className="navbar-text">
            <Link to="/" className="nav-link">
              URL Shorter
            </Link>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
