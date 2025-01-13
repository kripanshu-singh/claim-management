import React from "react";
import { SessionProvider } from "../context/session.js";
import PrivateRoute from "./PrivateRoute.js";

const Layout = () => {
  return (
    <SessionProvider>
      <PrivateRoute />
    </SessionProvider>
  );
};

export default Layout;
