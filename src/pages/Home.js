import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <section>
      <h1>Home page</h1>
      <h1>{currentUser ? "Connecté !" : "Non connecté..."}</h1>
    </section>
  );
}
