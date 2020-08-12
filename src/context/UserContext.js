import React from "react";
import axios from "axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      return { ...state, isAuthenticated: false };
      //throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  // Request API.
  axios
    .post("http://localhost:1337/auth/local", {
      identifier: login,
      password: password,
    })
    .then(response => {
      // Handle success.
      console.log("Well done!");
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("id_token", response.data.jwt);
        setError(null);
        setIsLoading(false);
        dispatch({ type: "LOGIN_SUCCESS" });

        history.push("/app/dashboard");
      }, 2000);
    })
    .catch(error => {
      // Handle error.
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    });
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("user");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
