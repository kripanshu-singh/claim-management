import React from "react";
import InsurerDashboard from "../components/InsurerDashboard.js";
import PatientDashboard from "../components/PatientDashboard.js";
import { useSession } from "../context/session.js";
import Spinner from "../components/Spinner.js";

const Dashboard = () => {
  const { userObject } = useSession();
  if (!userObject) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {userObject?.role === "insurer" ? (
        <InsurerDashboard />
      ) : (
        <PatientDashboard />
      )}
    </div>
  );
};

export default Dashboard;
