import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";
//

import { SessionProvider } from "../context/session.js";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
const Layout = () => {
  return (
    <SessionProvider>
      {/* <Header /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </SessionProvider>
  );
};

export default Layout;
