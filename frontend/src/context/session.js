import PropType from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import js_cookie from "js-cookie";

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
  // console.log(`\n ~ SessionProvider ~ userObject :- `, userObject);

  const getUserFormToken = async (accessToken) => {
    try {
      // Make the API request
      const response = await axios.get(
        `http://localhost:1000/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // Log the response for debugging
      // console.log(`\n ~ getUserFormToken ~ response :- `, response.data);

      // Process the response data (uncomment these if needed)
      // setUserID(response?.data?._id);
      setUserObject(response?.data);

      return response.data; // Return data if required
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
      getUserFormToken(accessToken);
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
