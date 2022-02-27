import jwt_decode from "jwt-decode";

const authorize = () => {
  const token = localStorage.getItem("token");
  let logginUser;
  if (token) logginUser = jwt_decode(token);
  return { logginUser, token };
};

export { authorize };
