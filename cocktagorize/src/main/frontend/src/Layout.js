import React from "react";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./component/common/sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
        <Sidebar></Sidebar>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
