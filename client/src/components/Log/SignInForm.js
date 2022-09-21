import React from "react";
import axios from "axios";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    // Appel API POST axios
    axios({
      method: "post",
      url: `http://localhost:5000/api/user/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then(() => {
        // Envoi des messages d'erreurs si besoin
        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        emailError.innerText = err.response.data.errors.email;
        passwordError.innerText = err.response.data.errors.password;
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        id="email"
        // Je stock la valeur de l'input au changement
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        // Je stock la valeur de l'input au changement
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
