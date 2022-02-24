import { useEffect, useState } from "react";
import { getProfile } from "../../../services/requestService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState({});

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
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    try {
      e.preventDefault();
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card mt-5 mb-5 w-50 m-auto">
      <div className="card-header">User Profile</div>
      <div className="card-body mt-3">
        {user && (
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

            <div className="mb-3 row">
              <div className="col-5"></div>
              <div className="col-6 m-auto">
                <input
                  type="submit"
                  className="btn btn-success mt-3"
                  value="Update"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
