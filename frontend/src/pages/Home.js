import React from "react";
import { useSession } from "../context/session.js";

const Home = () => {
  const { userObject } = useSession();
  console.log(`\n ~ App ~ userObject :- `, userObject);

  return (
    <div>
      <h1>Hello {userObject?.name}</h1>
      <h2>You are a {userObject?.role}</h2>
    </div>
  );
};

export default Home;
