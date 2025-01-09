import React from "react";
import InsurerDashboard from "../components/InsurerDashboard.js";
import PatientDashboard from "../components/PatientDashboard.js";
import { useSession } from "../context/session.js";

const Dashboard = () => {
  const { userObject } = useSession();

  return (
    <div>
      {userObject?.role === "insurer" ? <InsurerDashboard /> : <PatientDashboard />}
    </div>
  );
};

export default Dashboard;
