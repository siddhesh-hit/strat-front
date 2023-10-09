import React, { useState, useEffect } from "react";
import HeroRight from "./HeroRight";
import DataTable from "react-data-table-component";
import { API } from "../../../config";

const RightListSide = () => {
  const [list, setList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const responseData = async () => {
    try {
      const response = await fetch(`${API.localhost}/alllists`, {
        method: "GET",
        credentials: "same-origin", // or 'same-origin'
      });
      const data = await response.json();

      // Normalize and capitalize the first letter of each word in the text property
      const normalizedData = data.map((list) => {
        const normalizedText = normalizeString(list.text);
        const capitalizedText = normalizedText.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );

        return {
          ...list,
          text: capitalizedText,
        };
      });

      setList(normalizedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterInput = (e) => {
    const value = normalizeString(e.target.value); // Normalize the search input
    setFilterInput(value);

    const filteredlists = list.filter((val) => {
      const normalizedText = normalizeString(val.text); // Normalize the text property
      return normalizedText.includes(value);
    });

    setFilteredData(filteredlists); // Update the filtered data state
  };

  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleCopy = () => {};

  const columns = [
    {
      // Custom cell for radio button
      cell: () => (
        <div className="square-radio">
          <input
            type="radio"
            name="selectedRow"
            checked={!selectedRow} // Check if this row is selected
            onChange={() => setSelectedRow(false)} // Update selected row on change
          />
        </div>
      ),
      width: "10px", // Adjust width as needed
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "ICON",
      cell: (row) => console.log(row, "check rows"),
      // <img
      //   src={`${API.basic}${row.url}`}
      //   alt="Icon"
      //   style={{ width: "30px", height: "30px" }} // Adjust dimensions as needed
      // />
      ignoreRowClick: true,
      allowOverflow: true,
      button: false, // Set to false because this cell doesn't require buttons
    },

    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "TEXT",
      selector: "text",
      sortable: true,
    },
    {
      name: "CREATEDAT",
      selector: "created_at",
      sortable: true,
    },
    {
      name: "UPDATEDAT",
      selector: "updated_at",
      sortable: true,
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
      width: "150px", // Adjust width as needed
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

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
  }, []);

  return (
    <div className="rightSide">
      <HeroRight data={list} details={"List"} />

      <div className="mainTableDiv">
        <div className="filter">
          <input
            type="search"
            placeholder="Search..."
            value={filterInput}
            onChange={handleFilterInput}
          />
        </div>
        <DataTable
          className="data-table"
          columns={columns}
          data={filteredData.length > 0 ? filteredData : list}
          pagination
          paginationPerPage={30}
          paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default RightListSide;
