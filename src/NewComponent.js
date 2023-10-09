import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "./Component/Topbar";
import Channel from "./Component/Channels/Channel";
import Mediums from "./Component/Mediums/Mediums";
import Lists from "./Component/Lists/Lists";
import Nav_toggle from "./Component/Nav-toggle";
import enevlop from "./image/envelop.svg";
import { AuthTokenContext } from "./App";
import { Link, NavLink } from "react-router-dom";
import Loader from "./Component/Loader/Loader";
import { ImCross } from "react-icons/im";
import { BsBoxArrowRight } from "react-icons/bs";
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap"
  rel="stylesheet"
></link>;

const NewComponent = ({ setAuthToken }) => {
  const authToken = useContext(AuthTokenContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authToken.length === 0) {
      navigate("/");
    }
  });

  const logOut = () => {
    localStorage.clear();
    setAuthToken("");
    navigate(`/`);
    // window.location.reload(false);
  };

  const [shows, setShows] = useState(true);

  const comp = () => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <div className="no_scroll">
        <div className="wrapper">
          {/* <Topbar setAuthToken={setAuthToken} /> */}
          <header className="top-header">
            <nav className="navbar navbar-expand">
              <div
                className="mobile-toggle-icon d-xl-none"
                onClick={() => setShows((s) => !s)}
              >
                {shows ? <ImCross /> : <i className="bi bi-list" />}
              </div>
              {/* <h1 className="user_name">shubham</h1> */}
              {/* <div className="side_line">|</div> */}
              <button onClick={logOut} className="logout">
                <span>Logout</span>
                <span className="logout_arrow">
                  <BsBoxArrowRight />
                </span>
              </button>
            </nav>
          </header>
          <aside
            className="sidebar-wrapper"
            style={{ display: shows ? "block" : "none" }}
          >
            <div className="iconmenu">
              <Nav_toggle />

              <Channel />
            </div>

            <Mediums />
          </aside>

          <Lists />
        </div>
      </div>
    );
  };

  return <>{comp()}</>;
};

export default NewComponent;
