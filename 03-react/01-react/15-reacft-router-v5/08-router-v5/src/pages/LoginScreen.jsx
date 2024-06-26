import React, { useContext } from "react";
import { useHistory } from "react-router";
// import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authTypes } from "../type/authTypes";

const LoginScreen = () => {
  const { dispatch } = useContext(AuthContext);

  const history = useHistory();
  const handleLogin = () => {
    dispatch({ type: authTypes.login });
    // console.log(history);
    history.push("/");
  };

  return (
    <div className="container mt-5 text-center">
      <img src="/assets/animate.gif" alt="animacion" />
      <h1 className="my-3">Login Screen</h1>
      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};

export default LoginScreen;
