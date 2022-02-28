import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toast, successToast, errorToast } from "../Toast/Toast";
import { registerReq } from "../../services/requestService";

const Register = ({ history }) => {
  const schema = yup
    .object({
      firstname: yup.string().min(2).max(20).required(),
      lastname: yup.string().min(2).max(20).required(),
      email: yup.string().email().required(),
      username: yup.string().min(4).max(20).required(),
      password: yup
        .string()
        .required("Please enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
          "Password must contain at least 6 characters, one uppercase, one lowercase and one number"
        ),
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords don't match."),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (data) {
        const response = await registerReq(data);
        if (response.status === 201) {
          successToast("Registration successfully");
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        }
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

  const setErrors = (errs) => {
    if (Object.keys(errs).length > 0) {
      let msg = "";
      Object.values(errs).forEach((el) => {
        msg += el.message + "\n";
      });

      return (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <div style={{ whiteSpace: "pre" }}>{msg}</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      );
    }
  };

  return (
    <div className="container col-5 m-auto mt-5">
      <Toast />
      <div className="card">
        <div className="card-header">Register</div>
        <div className="card-body mt-3">
          {setErrors(errors)}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 row">
              <label htmlFor="firstname" className="col-sm-2 col-form-label">
                Firstname
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  {...register("firstname")}
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
                  {...register("lastname")}
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
                  {...register("email")}
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
                  {...register("username")}
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
                  {...register("password")}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Confirm Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  {...register("confirmPassword")}
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
