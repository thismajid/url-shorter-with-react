import React from "react";
import { Redirect } from "react-router-dom";

const Redirecting = ({ to }) => {
  return <Redirect to={to} />;
};

export default Redirecting;
