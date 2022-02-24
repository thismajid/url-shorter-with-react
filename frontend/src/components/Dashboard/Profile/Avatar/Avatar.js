import { useState } from "react";
import { Toast, successToast, errorToast } from "../../../Toast/Toast";
import {
  uploadAvatar,
  removeAvatar,
} from "../../../../services/requestService";

const Avatar = () => {
  const [avatar, setAvatar] = useState(null);

  const changeHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        await uploadAvatar(formData);
        successToast("Avatar uploaded successfully");
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/logout";
        }, 2500);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  const removeHandler = async (e) => {
    try {
      await removeAvatar();
      successToast("Avatar removed successfully");
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/logout";
      }, 2500);
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <div className="card mt-5 mb-5 w-50 m-auto">
      <Toast />
      <div className="card-header">User Avatar</div>
      <div className="card-body mt-3">
        <form>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              onChange={changeHandler}
            />
          </div>
        </form>
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={submitHandler}>
            Upload
          </button>
          <button
            className="btn btn-outline-danger ms-3"
            onClick={removeHandler}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
