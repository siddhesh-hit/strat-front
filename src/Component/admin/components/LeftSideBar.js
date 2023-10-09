// import React from "react";
// const LeftSideBar = () => {
//   return (
//     <div>
//       <div></div>
//     </div>
//   );
// };

// export default LeftSideBar;

import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import RightSide from "./RightSide";
import { NavLink } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      {/* <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Strategy Tool
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Channel</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/List" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">List</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Medium</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">User</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar> */}
      <Sidebar
        rootStyles={{
          background: "#020202",
        }}
      >
        <Menu>
          <SubMenu label="Strapi">
            <MenuItem> Medium </MenuItem>
            <MenuItem> List </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
      <RightSide />
    </div>
  );
};

export default LeftSideBar;
