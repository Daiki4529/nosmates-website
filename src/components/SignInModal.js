import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignInModal() {
  const { modalState, toggleModals, signIn } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (element) => {
    if (element && !inputs.current.includes(element)) {
      inputs.current.push(element);
    }
  };
  const formRef = useRef();

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      await signIn(inputs.current[0].value, inputs.current[1].value);
      //formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/profile/profile-home");
    } catch (error) {
      setValidation("Email ou/et mot de passe incorrect(s)");
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
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
                  <form className="sign-in" ref={formRef} onSubmit={handleForm}>
                    <div className="form-inputs">
                      <div className="form-group">
                        <label htmlFor="signInEmail">Adresse Email</label>
                        <input
                          ref={addInputs}
                          name="email"
                          type="email"
                          className="form-input"
                          id="signInEmail"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="signInPwd">Mot de passe</label>
                        <input
                          ref={addInputs}
                          name="password"
                          type="password"
                          className="form-input"
                          id="signInPwd"
                          required
                        />
                        <p className="form-error">{validation}</p>
                      </div>
                    </div>
                    <button className="confirm-button">Se connecter</button>
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
