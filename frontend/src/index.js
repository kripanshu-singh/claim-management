import React from "react";
import ReactDOM from "react-dom/client";
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
    // errorElement: <ErrorPage />,
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
      // {
      //   path: "/profile",
      //   element: <UserProfile />,
      // },
      // {
      //   path: "/authors",
      //   element: <Authors />,
      // },
      {
        path: "/raise_claim",
        element: <Claim />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // {
      //   path: "/raise_claim",
      //   element: <Claim />,
      // },
      // {
      //   path: "/post/categories/:category",
      //   element: <CategoryPost />,
      // },
      {
        path: "/claims/:id",
        element: <SingleClaim />,
      },
      // {
      //   path: "/myposts/:id",
      //   element: <DashBoard />,
      // },
      // {
      //   path: "/post/:id/edit",
      //   element: <EditPost />,
      // },
      // {
      //   path: "/post/:id/delete",
      //   element: <DeletePost />,
      // },
      // {
      //   path: "/logout",
      //   element: <Logout />,
      // },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
