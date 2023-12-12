import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignUpModal() {
  const { modalState, toggleModals, signUp } = useContext(UserContext);
  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (element) => {
    if (element && !inputs.current.includes(element)) {
      inputs.current.push(element);
    }
  };

  const formRef = useRef();
  const navigate = useNavigate();
  const handleForm = async (event) => {
    event.preventDefault();
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 caractères minimum");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Les mots de passes ne correspondent pas, réésayez.");
    }

    try {
      await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/profile/profile-home");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setValidation("Format d'email invalide.");
      }
      if (error.code === "auth/email-already-in-use") {
        setValidation("Email déjà utilisé");
      }
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="modal">
          <div className="overlay" onClick={closeModal}></div>
          <div className="card-position">
            <div className="card">
              <div className="card-content">
                <div className="card-header">
                  <p className="card-title">Créer un compte</p>
                  <button className="card-close" onClick={closeModal}>
                    <span className="fa-lg fa-solid fa-xmark"></span>
                  </button>
                  <div className="bg"></div>
                </div>
                <div className="card-body">
                  <form className="sign-up" ref={formRef} onSubmit={handleForm}>
                    <div className="form-inputs">
                      <div className="form-group">
                        <label htmlFor="signUpEmail">Adresse Email</label>
                        <input
                          ref={addInputs}
                          name="email"
                          type="email"
                          className="form-input"
                          id="signUpEmail"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="signUpPwd">Mot de passe</label>
                        <input
                          ref={addInputs}
                          name="password"
                          type="password"
                          className="form-input"
                          id="signUpPwd"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="repeatPwd">
                          Confirmer le mot de passe
                        </label>
                        <input
                          ref={addInputs}
                          name="password"
                          type="password"
                          className="form-input"
                          id="repeatPwd"
                          required
                        />
                        <p className="form-error">{validation}</p>
                      </div>
                    </div>
                    <button className="confirm-button">Créer</button>
                  </form>
                  <div className="bg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
