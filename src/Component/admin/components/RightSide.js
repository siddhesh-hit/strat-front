import React, { useState, useEffect } from "react";
import { API } from "../../../config";

const RightSide = () => {
  const [channel, setChannel] = useState([]);

  const fetchData = () => {
    fetch(API.localhost + "/allChannels")
      .then((res) => res.json())
      .then((res) => setChannel(res));
  };

  function formatDateToDayMonthYear(dateString) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${dayOfWeek}, ${day} ${monthName} ${year}`;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="rightSide" style={{ marginLeft: "3rem" }}>
      <table className="table">
        <thead>
          <tr>
            <th style={{ margin: "20px" }}>ICON</th>
            <th style={{ margin: "20px" }}>ID</th>
            <th style={{ margin: "20px" }}>TEXT</th>
            <th style={{ margin: "20px" }}>CREATEDAT</th>
            <th style={{ margin: "20px" }}>UPDATEDAT</th>
            <th style={{ margin: "20px" }}>BANNER</th>
            <th style={{ margin: "20px" }}>MEDIUMS</th>
            <th style={{ margin: "20px" }}>STATE</th>
            <th style={{ margin: "20px" }}></th>
          </tr>
        </thead>
        <tbody>
          {channel.length > 0 &&
            channel.map((val) => (
              <tr>
                <td style={{ margin: "20px" }}>
                  <img
                    src={`${API.basic}${val.url}`}
                    alt="Icon"
                    style={{ width: "30px", height: "30px" }}
                  />
                </td>
                <td style={{ margin: "20px" }}>{val.id}</td>
                <td style={{ margin: "20px" }}>{val.text}</td>
                <td style={{ margin: "20px" }}>
                  {formatDateToDayMonthYear(val.created_at)}
                </td>
                <td style={{ margin: "20px" }}>
                  {formatDateToDayMonthYear(val.updated_at)}
                </td>
                <td style={{ margin: "20px" }}>{val.id}</td>
                <td style={{ margin: "20px" }}>{val.id}</td>
                <td style={{ margin: "20px" }}>{val.id}</td>
                <td>
                  <div className="icons-right">
                    <i
                      className="fa fa-edit"
                      style={{ margin: "10px" }}
                      // onClick={() => handleEdit(row)}
                    ></i>
                    <i
                      className="fa fa-copy"
                      style={{ margin: "10px" }}
                      // onClick={() => handleCopy(row)}
                    ></i>
                    <i
                      className="fa fa-trash"
                      style={{ margin: "10px" }}
                      // onClick={() => handleDelete(row)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RightSide;
