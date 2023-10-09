import React , {useEffect} from "react";
import {useNavigate } from "react-router-dom";
// import {auth} from "../Component/firebase"
// import {signOut } from "firebase/auth";
import { BsBoxArrowRight } from 'react-icons/bs';
const Topbar = ({setAuthToken}) => {

  const navigate = useNavigate();


  const logOut = () => {
  
    localStorage.clear()
    setAuthToken("")
     navigate(`/`)      
    // window.location.reload(false);

  }

  
  

  return (
    <div>
      <header className="top-header">
        <nav className="navbar navbar-expand">
          <div className="mobile-toggle-icon d-xl-none">
            <i className="bi bi-list" />
          </div>
          <div className="search-toggle-icon d-xl-none ms-auto">
            {/* <i className="bi bi-search" /> */}
            
          </div>
          
          <button onClick={logOut} className="logout"><span>Logout</span><span className="logout_arrow"><BsBoxArrowRight/></span></button>
          
        </nav>
        
      </header>
    </div>
    
  );
};

export default Topbar;
