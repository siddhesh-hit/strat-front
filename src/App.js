import React, { useState, useEffect, useContext } from "react";
import NewComponent from "./NewComponent";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Login from "./Component/SignIn/Login";
import Register from "./Component/SignIn/Register";
import HomePage from "./Component/HomePage/HomePage";
import SocialMedia from "../src/Component/HomePage/SocialMedia";
import { useNavigate } from "react-router-dom";
import Privacypolicy from "./Component/HomePage/Privacypolicy";
import Termscondition from "./Component/HomePage/Termscondition";
import List from "./Component/admin/List";
import Cartpage from "./Component/Navbar/Cartpage";
import Pricing from "./Component/Pricing";
import LoginContainer from "./Component/LoginContainer";
import { Spinner } from "react-bootstrap";
import Forgot from "./Component/SignIn/Forgot";
import ResetPassword from "./Component/SignIn/ResetPassword";
import Contactus from "./Component/HomePage/Contactus";
import Dashboard from "./Component/admin/Dashboard";
import "./App.css";

const AuthTokenContext = React.createContext();

function App() {
  const [authToken, setAuthToken] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin-token") !== null) {
      setAdmin(localStorage.getItem("admin-token"));
    } else {
      const adminToken = localStorage.getItem("admin-token");
      if (adminToken !== null && adminToken === "1") {
        setAdmin(true);
      }
    }

    if (localStorage.getItem("token") !== null) {
      setAuthToken(localStorage.getItem("token"));
    } else {
      if (window.location.pathname === "/login") {
        window.location.pathname = "/login";
      }
    }
  });

  return (
    <>
      <AuthTokenContext.Provider value={authToken}>
        <HashRouter>
          <Routes>
            <Route path="/socialmedia" element={<SocialMedia />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/Forgot" element={<Forgot />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/Contactus" element={<Contactus />} />
            <Route path="/Privacypolicy" element={<Privacypolicy />} />
            <Route path="/Cartpage" element={<Cartpage />} />
            <Route path="/Termscondition" element={<Termscondition />} />
            <Route path="/List" element={<List />} />
            <Route
              path="/login"
              element={<LoginContainer setAuthToken={setAuthToken} />}
            />
            {admin ? (
              <Route path="/Dashboard" element={<Dashboard />} />
            ) : (
              <Route
                path="/"
                element={<HomePage setAuthToken={setAuthToken} />}
              />
            )}
            <Route path="/register" element={<Register />} />
            {authToken ? (
              <Route
                path="*"
                element={<NewComponent setAuthToken={setAuthToken} />}
              />
            ) : (
              <Route
                path="/"
                element={<HomePage setAuthToken={setAuthToken} />}
              />
            )}
          </Routes>
        </HashRouter>
      </AuthTokenContext.Provider>
    </>
  );
}
export default App;
export { AuthTokenContext };
