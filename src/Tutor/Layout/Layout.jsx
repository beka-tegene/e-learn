import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 6fr" }}>
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
