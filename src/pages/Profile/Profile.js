import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useContext(UserContext);
  console.log("PRIVATE", currentUser);
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <Outlet />
    </section>
  );
}
