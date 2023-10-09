import React, { Component, useState, useEffect, useContext } from "react";
import "./SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Recaptcha from "react-google-recaptcha";
import swal from "sweetalert";
import { API } from "../../config";

// import Cookie from "js-cookie";
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap"
  rel="stylesheet"
></link>;

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const direction = () => {
    navigate(`/login`);
  };

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          You have entered an invalid username or password
        </div>
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsError(false);
    axios
      .post(`${API.localhost}/register`, { username, email, password })
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          if (JSON.stringify(res.data["0"]["email"] != "")) {
            swal("Oops!", "Email Already Exists", "error");
          }
        } else {
          const uid = res.data.insertId;
          user_role_link(uid);
          swal("Registration Successfully");
          direction();
        }
      })
      .catch((error) => {
        setTimeout(() => setIsError(false), 4000);
        console.log(error);
      });
    setIsLoading(false);
  };

  const user_role_link = async (uid) => {
    let result = await fetch(`${API.localhost}/add_user_role_link`, {
      method: "POST",
      body: JSON.stringify({ uid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
  };

  return (
    <div className="background_color">
      <div className="outer">
        <div className="inner">
          <form onSubmit={submitHandler}>
            <h3 className="robotic-font">Register</h3>
            <div className="form-group">
              <label className="robotic-font">Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <label className="robotic-font">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label className="robotic-font">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark btn-lg btn-block robotic-font"
            >
              Register
            </button>
            <p className="forgot-password text-right robotic-font">
              Already registered{" "}
              <span
                href="/login"
                className="robotic-font register_page"
                onClick={direction}
              >
                log in?
              </span>
            </p>
          </form>
          <br />
          {renderError()}
        </div>
      </div>
    </div>
  );
};

export default Register;
