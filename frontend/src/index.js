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
import InsurerDashboard from "./pages/InsurerDashboard.js";
import Logout from "./pages/Logout.js";
import PatientDashboard from "./pages/PatientDashboard.js";
import SingleClaim from "./pages/SingleClaim.js";

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
      // {
      //   path: "/posts/:id",
      //   element: <PostDetail />,
      // },
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
        path: "/insurer_dashboard",
        element: <InsurerDashboard />,
      },
      {
        path: "/patient_dashboard",
        element: <PatientDashboard />,
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
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
