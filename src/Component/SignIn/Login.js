import React, { Component, useState, useContext, useEffect } from "react";
import axios from "axios";
import "./SignIn.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import setToken from "../../helper/setToken";
import { AuthTokenContext } from "../../App";
import Loader from "./Loader";
import swal from "sweetalert";
import { API } from "../../config";

// import { GoogleLogin} from "react-google-login";
// import {gapi} from "gapi-script";

// const CLIENT_ID =
//   "5058742127-vc7kp36q17m1373m0bek2fg1premh36a.apps.googleusercontent.com";

const Login = ({ setAuthToken }) => {
  const authToken = useContext(AuthTokenContext);
  const [identifier, setIdentifier] = useState();
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["jwt"]);
  const [jwt, setJwt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({ clientId: CLIENT_ID, scope: "" });
  //   }
  //   gapi.load("client:auth2", start);
  // });

  // const responseGoogleSuccess = async (response) => {
  //   axios
  //     .post(`https://admin.strategytool.io/api/auth/local/`, { identifier, password })
  //     .then((res) => {
  //       localStorage.setItem("token", JSON.stringify(res.data.jwt));
  //       console.log(identifier, password);
  //       user_data(identifier);
  //       setToken(res.data.jwt);
  //       setAuthToken(res.data.jwt);
  //       navigate("/facebook");
  //     })

  //   const google_response = response['profileObj'];
  //   console.log(response);
  // }

  // // Error Handler
  // const responseGoogleError = (response) => {
  //   console.log(response);
  // };

  useEffect(() => {
    if (authToken.length !== 0) {
      navigate("/Homepage");
    }
  });

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

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.post(`${API.localhost}/login`, {
        identifier,
        password,
      });
      const admin = response.data.results.user.admin;
      console.log(admin, "ye hai mera admin");
      if (admin == 1) {
        localStorage.setItem("admin-token", admin);
        navigate(`/Dashboard`); // Use the proper route name here
      } else {
        const userdata = response.data.results;
        const userid = userdata.user.id;
        localStorage.setItem("token", userdata.jwt);
        localStorage.setItem("user_id", userdata.user.id);
        setAuthToken(userdata.jwt);
        check_subscription(userid, userdata.jwt);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
  };

  const check_subscription = async (userid, token) => {
    let result = await fetch(`${API.localhost}/subscriptiondt`, {
      method: "POST",
      body: JSON.stringify({ userid }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    if (data != "") {
      const platform_ids = data[0]["platforms"];
      localStorage.setItem("subscribe_platform_id", platform_ids);
      swal({
        title: "Wow!",
        text: "Login Successfully",
        type: "success",
      }).then(function () {
        localStorage.setItem("token", token);
        sessionStorage.clear();
        navigate("/Homepage");
        window.location.href = "#/Homepage";
      });
    } else {
      navigate("/Pricing");
    }
  };

  const register = () => {
    navigate("/register");
  };

  const forget = () => {
    navigate("/Forgot");
  };

  return (
    <div className="background_color">
      <div className="outer">
        <div className="inner">
          <form onSubmit={submitHandler}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h3 className="outer robotic-font">Log in</h3>
                <div className="form-group">
                  <label className="robotic-font">Email</label>
                  <input
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
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
                  Sign in
                </button>
                {/* <GoogleLogin className="google_buttons"
                  clientId={CLIENT_ID}
                  buttonText="Sign In with Google"    
                  onSuccess={responseGoogleSuccess}    
                  onFailure={responseGoogleError}
                  isSignedIn={true}       
                  cookiePolicy={"single_host_origin"}
                /><br/><br/> */}
                <span className="sign-up">
                  Not Registered?{" "}
                  <span
                    to="/register"
                    className="robotic-font sign_up_left"
                    onClick={register}
                  >
                    SignUp
                  </span>
                </span>
                <span className="forgot-password text-right">
                  Forgot{" "}
                  <span
                    href="/Forgot"
                    className="robotic-font forgot_password"
                    onClick={forget}
                  >
                    password?
                  </span>
                </span>
              </>
            )}
          </form>
          <br />
          {renderError()}
        </div>
      </div>
    </div>
  );
};

export default Login;
