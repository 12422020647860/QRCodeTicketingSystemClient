import React, { useContext } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ContextProvider, AuthContext } from "./contexts/AuthContext";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Home from "./pages/home";
import Recharge from "./pages/recharge";

const Layout = () => {
  const { isSignedIn } = useContext(AuthContext);
  return (
    <RouterProvider
      router={createHashRouter([
        {
          path: "/",
          element: isSignedIn ? <Home /> : <SignIn />,
        },
        {
          path: "register",
          element: <SignUp />,
        },
        {
          path: "recharge",
          element: isSignedIn ? <Recharge /> : <SignIn />,
        },
      ])}
    />
  );
};

export default () => {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
};
