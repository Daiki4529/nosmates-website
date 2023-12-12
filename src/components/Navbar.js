import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export default function Navbar() {
  const { toggleModals, currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert(
        "Pour des raisons inconnues, vous ne pouvez pas vous déconnecter. Vérifiez votre connexion internet et réessayez."
      );
    }
  };
  return (
    <nav className="navbar">
      <Link className="nav_main" to="/">
        Nosmates
      </Link>
      <div className="user-group">
        {!currentUser ? (
          <>
            <button
              className="nav_button signup_button"
              onClick={() => toggleModals("signUp")}
            >
              Créer un compte
            </button>
            <button
              className="nav_button signin_button"
              onClick={() => toggleModals("signIn")}
            >
              Se connecter
            </button>
          </>
        ) : (
          <button className="nav_button logout_button" onClick={logOut}>
            Se déconnecter
          </button>
        )}
      </div>

      <div className="bg"></div>
    </nav>
  );
}
