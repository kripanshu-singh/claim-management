import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";
//

import { SessionProvider } from "../context/session.js";
const Layout = () => {
  return (
    <SessionProvider>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </SessionProvider>
  );
};

export default Layout;
