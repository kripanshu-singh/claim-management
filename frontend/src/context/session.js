import PropType from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import js_cookie from "js-cookie";
import claimApi from "../api/claimApi.js";

const SessionContext = createContext();

function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      "This hook cannot be used outside the SessionProvider Component",
    );
  }
  return context;
}

function SessionProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [userObject, setUserObject] = useState(null);

  const getUserFormToken = async () => {
    try {
      // Make the API request
      const response = await claimApi.getProfile();
      setUserObject(response);
    } catch (error) {
      // Handle errors
      console.error(`\n ~ getUserFormToken ~ error :- `, error.message);
      throw error; // Re-throw the error if further handling is required
    }
  };

  useEffect(() => {
    console.log("first");
    const accessToken = js_cookie.get("accessToken") || null;

    setAccessToken(accessToken);
    if (!userObject && accessToken) {
      getUserFormToken();
    }
  }, []);

  const userLogOut = () => {
    setAccessToken(null);
    setUserObject(null);
    js_cookie.remove("accessToken");
    js_cookie.remove("refreshToken");
  };

  const sendToContext = (response) => {
    if (response?.accessToken) {
      setAccessToken(response?.accessToken);
      js_cookie.set("accessToken", response?.accessToken);
    }
    if (response?.refreshToken) {
      js_cookie.set("refreshToken", response?.refreshToken);
    }
    if (response?.user) {
      setUserObject(response?.user);
    }
  };

  const contextValue = {
    userObject,
    accessToken,
    userLogOut,
    sendToContext,
  };
  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropType.element.isRequired,
};

export { useSession, SessionProvider };
