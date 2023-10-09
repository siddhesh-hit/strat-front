import React from "react";
import LeftSideBar from "./components/LeftSideBar";
import RightListSide from "./components/RightListSide";

const List = () => {
  return (
    <div className="dashboardFlex">
      <LeftSideBar />
      <RightListSide />
    </div>
  );
};

export default List;
