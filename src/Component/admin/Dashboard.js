import React from "react";
import LeftSideBar from "./components/LeftSideBar";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
const Dashboard = () => {
  return (
    <div className="dashboardFlex">
      <LeftSideBar />
    </div>
  );
};

export default Dashboard;
