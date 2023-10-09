import React, { useContext } from "react";
import './NavHome.css';
import { Container, Navbar } from "react-bootstrap";
import { AuthTokenContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../../icons/logo.png";
import logo1 from "../../image/strategytool.io.png";
import login from "../../image/login.svg";
import register from "../../image/register.svg";
import pricing from "../../image/pricing.svg";
const NavHome = ({ setAuthToken }) => {
  const authToken = useContext(AuthTokenContext)
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(['jwt']);

  const direction = () => {
    navigate(`/login`);
  }


  const clickHandler = () => {
    direction();
  }

  const logout = () => {
    localStorage.clear()
    setAuthToken("")
    navigate(`/`)
  }
               
             
  const home = () => {
    if (authToken.length !== 0) {
      navigate('/facebook')
    } else {
      navigate("/login")
    }
  }

  const submitHandler = () => {
   
  }


  return (
    <div>
      <Navbar expand="lg" variant="light" bg="light" className="navigation_bar">
        <img className="abcds1234" src={logo} style={{ height: "50px", marginLeft: "18px" }}></img>
        <img className="abcds123" src={logo1} style={{ height: "30px", marginLeft: "18px" }}></img>
        {(authToken.length !== 0) ? <button onClick={home} className="dashBoard"> Go To Dashboard </button> : ""}
        {(authToken.length !== 0) ? (
          <button onClick={logout} className='login-btn1'>Logout</button>
        ) : ([<img style={{cursor:'pointer'}} className="login-btn1" onClick={clickHandler} src={login} />,<Link to="/register" style={{color:'white'}}><img className='register-btn1' src={register}></img></Link>])
        }

      </Navbar>
      <Link className="abcdspricing" to="/pricing"><img style={{cursor:'pointer'}} src={pricing} onClick={submitHandler}/></Link>
    </div>
  );
};

export default NavHome;