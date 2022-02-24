import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toast, successToast, errorToast } from "../../Toast/Toast";
import { getProfile, changeProfile } from "../../../services/requestService";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await getProfile();
      if (data) {
        setUser(data.data);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateHandler = async (e) => {
    try {
      e.preventDefault();
      if (user) {
        await changeProfile(user);
        successToast("Profile changed successfully");
        setTimeout(() => {
          window.location.href = "/logout";
          localStorage.removeItem("token");
        }, 2500);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <div className="card mt-5 mb-5 w-50 m-auto">
      <Toast />
      <div className="card-header">User Profile</div>
      <div className="card-body mt-3">
        {user && (
          <form>
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
                  readOnly
                  value={user.email}
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
                  readOnly
                  value={user.username}
                />
              </div>
            </div>
          </form>
        )}
        <div className="text-center mt-5 mb-3">
          <button className="btn btn-secondary">Reset Password</button>
          <button className="btn btn-success ms-3" onClick={updateHandler}>
            Update
          </button>
          <Link to="/profile/avatar">
            <button className="btn btn-primary ms-3">Change Avatar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
