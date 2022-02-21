import { useState } from "react";
import { Toast, successToast, errorToast } from "../Toast/Toast";
import { registerReq } from "../../services/requestService";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await registerReq(user);
      if (data) {
        successToast("Registration successfully");
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      }
    } catch (err) {
      if (
        err.response.data.message ===
        "Duplicate username, please pickup another username"
      ) {
        errorToast("Invalid username");
      } else if (
        err.response.data.message ===
        "Duplicate email address, please enter another email address"
      ) {
        errorToast("Invalid email");
      } else {
        errorToast("Something went wrong ...");
      }
    }
  };

  return (
    <div className="container col-5 m-auto mt-5">
      <Toast />
      <div className="card">
        <div className="card-header">Register</div>
        <div className="card-body mt-3">
          <form onSubmit={submitHandler}>
            <div className="mb-3 row">
              <label htmlFor="firstname" className="col-sm-2 col-form-label">
                Firstname
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  value={user.firstname}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="lastname" className="col-sm-2 col-form-label">
                Lastname
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  value={user.lastname}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-5"></div>
              <div className="col-6 m-auto">
                <input
                  type="submit"
                  className="btn btn-success mt-3"
                  value="Register"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
