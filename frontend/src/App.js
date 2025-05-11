import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.js";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Claim from "./pages/Claim.js";
import SingleClaim from "./pages/SingleClaim.js";
import AboutUs from "./pages/AboutUs.js";
import Contact from "./pages/Contactus.js";
import Dashboard from "./pages/Dashboard.js";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/raise_claim",
        element: <Claim />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/claims/:id",
        element: <SingleClaim />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
