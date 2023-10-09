import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Strategy from "../../icons/Strategy.png";
import { data } from "jquery";
import { API } from "../../config";

const Medium = ({ channels, setChannels }) => {
  const [mediums, setMediums] = useState([]);
  const [active, setActive] = useState();
  const [banimg, setBanimg] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();

  const location = useLocation();
  const decodedChannel = decodeURIComponent(location.pathname.split("/")[1]);
  const channel = decodedChannel.split("/")[0]; // Fix: Get the first element of the split array
  // console.log(decodedChannel, "ye ch");

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        "https://admin.strategytool.io/api/channels?populate=icon"
      );
    };
    fetchData();
  }, []);

  // actual link in the below the get axios
  // https://admin.strategytool.io/api/mediums?filters[channel][text]=${channel}&populate=icon

  useEffect(() => {
    let isMounted = true; // Flag to track component's mount status

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://admin.strategytool.io/api/mediums?filters[channel][text]=${channel}&populate=icon`
        );
        // console.log(response, "ye hai bahi");
        if (isMounted) {
          setMediums(response.data.data);
          getchid(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Clean up the flag when the component unmounts
    };
  }, [channel]);

  const clickHandler = (path) => {
    navigate(`${channel}/${path}`, { state: path });
    localStorage.setItem("pageno", 1);
    setActive(path);
  };

  function getchid(data) {
    var mid = data[0]["id"];
    var axios = require("axios");
    var data = JSON.stringify({
      mid: mid,
    });

    var config = {
      method: "post",
      url: `${API.localhost}/mdt`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getbanimg(JSON.stringify(response.data["0"]["channel_id"]));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getbanimg(cid) {
    var axios = require("axios");
    var data = JSON.stringify({
      cid: cid,
    });

    var config = {
      method: "post",
      url: `${API.localhost}/cdt`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setBanimg(response.data["0"]["url"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // console.log(mediums, "medium working");

  return (
    <div>
      <div className="textmenu">
        <div className="brand-logo">
          <img src={Strategy} width="100" alt="STRATEGY TOOL" />
        </div>
        <div className="tab-content">
          <div id="pills-dashboards">
            <div className="list-group list-group-flush">
              {mediums.map((e) => {
                const medium = e.attributes.medium;
                // console.log(medium)
                const img = e.attributes.icon.data;
                return (
                  <Link
                    onClick={() => clickHandler(medium)}
                    key={e.id}
                    id={medium}
                    to={`/${channel}/${medium}`}
                    style={
                      medium === active ? { backgroundColor: "#D5E0F1" } : null
                    }
                    className="list-group-item fontss"
                  >
                    {img?.attributes?.ext === ".png" && (
                      <img
                        src={`https://admin.strategytool.io/${img["attributes"]["url"]}`}
                        style={{ height: "16px", marginRight: "5px" }}
                      ></img>
                    )}
                    {img?.attributes?.ext === ".svg" && (
                      <img
                        src={`https://admin.strategytool.io/${img["attributes"]["url"]}`}
                        style={{ height: "16px", marginRight: "5px" }}
                      ></img>
                    )}
                    {img?.attributes?.ext === ".jpeg" && (
                      <img
                        src={`https://admin.strategytool.io/${img["attributes"]["url"]}`}
                        style={{ height: "16px", marginRight: "5px" }}
                      ></img>
                    )}
                    {img?.attributes?.ext === ".webp" && (
                      <img
                        src={`https://admin.strategytool.io/${img["attributes"]["url"]}`}
                        style={{ height: "16px", marginRight: "5px" }}
                      ></img>
                    )}
                    {img?.attributes?.ext === ".jpg" && (
                      <img
                        src={`https://admin.strategytool.io/${img["attributes"]["url"]}`}
                        style={{ height: "16px", marginRight: "5px" }}
                      ></img>
                    )}
                    {medium}
                  </Link>
                );
              })}
            </div>
          </div>
          {banimg ? (
            <img
              className="banimg"
              style={{
                width: "150px",
                marginLeft: "6px",
                position: "fixed",
                bottom: "20px",
              }}
              src={`https://admin.strategytool.io${banimg}`}
            ></img>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Medium;
