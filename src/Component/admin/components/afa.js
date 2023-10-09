import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import HeroRight from "./HeroRight";
import DataTable from "react-data-table-component";
import { API } from "../../../config";

const RightSide = () => {
  const [channel, setChannel] = useState([]);
  const [mediumChannel, setMediumChannel] = useState([]);
  const [selectedRow, setSelectedRow] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [mediumCountData, setMediumCountData] = useState({});
  const [mediumFilterCountData, setMediumFilterCountData] = useState([]);
  const [columns, setColumns] = useState([
    {
      // Custom cell for radio button
      cell: (row) => (
        <div className="square-checkbox">
          <input
            type="checkbox"
            onChange={() => setSelectedRow(!selectedRow)}
          />
        </div>
      ),
      width: "50px", // Adjust width as needed
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "ICON",
      cell: (row) => (
        <img
          src={`${API.basic}${row.url}`}
          alt="Icon"
          style={{ width: "30px", height: "30px" }} // Adjust dimensions as needed
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
      width: "100px",
    },
    {
      name: "ID",
      selector: "id",
      sortable: true,
      width: "150px",
    },
    {
      name: "TEXT",
      selector: "text",
      sortable: true,
      width: "200px",
    },
    {
      name: "CREATEDAT",
      selector: "created_at",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.created_at);
        return (
          <div>
            {date.toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </div>
        );
      },
    },
    {
      name: "UPDATEDAT",
      selector: "updated_at",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.updated_at);
        return (
          <div>
            {date.toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </div>
        );
      },
    },
    {
      name: "MEDIUM",
      selector: "medium_id",
      cell: (row) => {
        return <div>{mediumCountData[row.id] || 0}</div>;
      },
    },
    {
      // Custom cell for icons
      cell: (row) => (
        <div className="icons-right">
          <i className="fa fa-edit" onClick={() => handleEdit(row)}></i>
          <i className="fa fa-copy" onClick={() => handleCopy(row)}></i>
          <i className="fa fa-trash" onClick={() => handleDelete(row)}></i>
        </div>
      ),
      width: "100px", // Adjust width as needed
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [displayedColumns, setDisplayedColumns] = useState(columns);

  const check = [...columns];
  const optionsDrop = check.map((val) => val.name);
  const newOptionsDrop = optionsDrop.filter(
    (_, index) => index !== 0 && index !== 7
  );

  const responseData = async () => {
    try {
      const response = await fetch(`${API.localhost}/allChannels`, {
        method: "GET",
        credentials: "same-origin", // or 'same-origin'
      });
      const data = await response.json();

      // Normalize and capitalize the first letter of each word in the text property
      const normalizedData = data.map((channel) => {
        const normalizedText = normalizeString(channel.text);
        const capitalizedText = normalizedText.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );

        return {
          ...channel,
          text: capitalizedText,
        };
      });

      setChannel(normalizedData);

      // Calculate and set the medium count data
    } catch (error) {
      console.log(error);
    }
  };

  const mediumData = async () => {
    await fetch(`${API.localhost}/allChannelMedium`)
      .then((e) => e.json())
      .then((val) => setMediumChannel(val))
      .catch((E) => console.log(E));

    const mediumCounts = channel.reduce((countData, channel) => {
      const mediumCount = mediumChannel.filter(
        (med) => med.channel_id === channel.id
      );
      if (mediumCount.length > 0) {
        setMediumFilterCountData((prev) => ({
          ...prev,
          mediumCount,
        }));
      }
      countData[channel.id] = mediumCount.length;
      return countData;
    }, {});
    setMediumCountData(mediumCounts);
    console.log(mediumCountData, "c");
  };

  const handleFilterInput = (e) => {
    const value = normalizeString(e.target.value); // Normalize the search input
    setFilterInput(value);

    const filteredChannels = channel.filter((val) => {
      const normalizedText = normalizeString(val.text); // Normalize the text property
      return normalizedText.includes(value);
    });

    setFilteredData(filteredChannels); // Update the filtered data state
  };

  const handleDropDown = (selectedColumn) => {
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [selectedColumn]: true,
    }));

    const columnIndex = displayedColumns.findIndex(
      (column) => column.name === selectedColumn
    );

    if (columnIndex !== -1) {
      const updatedColumns = [...displayedColumns];
      updatedColumns.splice(columnIndex, 1);
      setDisplayedColumns(updatedColumns);
    }
  };

  console.log(displayedColumns, "dis");

  const handleRemoveColumn = (columnToRemove) => {
    setSelectedColumns((prev) => {
      const updatedColumns = { ...prev };
      delete updatedColumns[columnToRemove];
      return updatedColumns;
    });

    const columnIndex = columns.findIndex(
      (column) => column.name === columnToRemove
    );

    if (columnIndex !== -1) {
      const updatedColumns = [...displayedColumns];
      updatedColumns.splice(columnIndex, 0, columns[columnIndex]);
      setDisplayedColumns(updatedColumns);
    }
  };

  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleCopy = () => {};

  function normalizeString(input) {
    const conversionMap = {
      ᴀ: "a",
      ʙ: "b",
      ᴄ: "c",
      ᴅ: "d",
      ᴇ: "e",
      ꜰ: "f",
      ɢ: "g",
      ʜ: "h",
      ɪ: "i",
      ᴊ: "j",
      ᴋ: "k",
      ʟ: "l",
      ᴍ: "m",
      ɴ: "n",
      ᴏ: "o",
      ᴘ: "p",
      ǫ: "q",
      ʀ: "r",
      s: "s",
      ᴛ: "t",
      ᴜ: "u",
      ᴠ: "v",
      ᴡ: "w",
      x: "x",
      ʏ: "y",
      ᴢ: "z",
    };

    const normalized = input
      .toLowerCase()
      .replace(/[^\sA-Za-z0-9]/g, (char) => {
        return conversionMap[char] || char;
      });

    return normalized;
  }

  useEffect(() => {
    responseData();
    mediumData();
  }, []);

  // console.log(mediumChannel, "med");

  return (
    <div className="rightSide">
      <div className="mainTableDiv">
        <HeroRight data={channel} details={"Channel"} />

        <div className="filter-flex">
          <div className="filter">
            <input
              type="search"
              placeholder="Search..."
              value={filterInput}
              onChange={handleFilterInput}
            />
          </div>

          <div className="dropdownFilter">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {Object.keys(selectedColumns).length > 0
                  ? Object.keys(selectedColumns).map((col) => (
                      <span key={col} className="selected-column">
                        {col}
                        <span
                          className="remove-column"
                          onClick={() => handleRemoveColumn(col)}
                        >
                          &#x2715;
                        </span>
                      </span>
                    ))
                  : "Filter"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {newOptionsDrop.map((val) => (
                  <Dropdown.Item key={val} onClick={() => handleDropDown(val)}>
                    {val}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <DataTable
          className="data-table "
          columns={displayedColumns}
          data={filteredData.length > 0 ? filteredData : channel}
          pagination
          paginationPerPage={30}
          paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default RightSide;
