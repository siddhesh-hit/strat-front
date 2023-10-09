import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config";

const Channel = () => {
  const [channels, setChannels] = useState([]);
  const [active, setActive] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true; // Flag to track component's mount status

    const fetchData = async () => {
      try {
        const platform_id = localStorage.getItem("subscribe_platform_id");
        let result = await fetch(`${API.localhost}/channels`, {
          method: "POST",
          body: JSON.stringify({ platform_id })
            ? JSON.stringify({ platform_id })
            : 1,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        if (isMounted) {
          setChannels(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Clean up the flag when the component unmounts
    };
  }, []);

  const clickHandler = (path) => {
    navigate(`/${path}`, { state: path });
    setActive(path);
  };

  // console.log(channels, "ye chai ");

  return (
    <div>
      <ul className="nav nav-pills flex-column">
        {channels.map((e) => {
          const channel = e.text;

          return (
            <li
              key={e.id}
              className="nav-item fontss"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title={channel}
            >
              <Link
                to={`/${encodeURIComponent(channel)}`}
                className="nav-link"
                data-bs-target={`#${channel}`}
                style={
                  channel === active && " "
                    ? {
                        backgroundColor: "#D5E0F1",
                        boxShadow: "0px 3px 10px red !important",
                        // borderLeft:"4px solid #03a9f4"
                      }
                    : null
                }
                onClick={() => clickHandler(channel)}
              >
                {e?.ext === ".svg" && (
                  <img
                    src={`https://admin.strategytool.io/${e.url}`}
                    className="logo_iconss"
                  ></img>
                )}
                {e?.ext === ".png" && (
                  <img
                    src={`https://admin.strategytool.io/${e.url}`}
                    className="logo_iconss"
                  ></img>
                )}
                {e?.ext === ".jpg" && (
                  <img
                    src={`https://admin.strategytool.io/${e.url}`}
                    className="logo_iconss"
                  ></img>
                )}
                {e?.ext === ".jpeg" && (
                  <img
                    src={`https://admin.strategytool.io/${e.url}`}
                    className="logo_iconss"
                  ></img>
                )}
                {e?.ext === ".webp" && (
                  <img
                    src={`https://admin.strategytool.io/${e.url}`}
                    className="logo_iconss"
                  ></img>
                )}
                {/* {channel} */}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channel;
