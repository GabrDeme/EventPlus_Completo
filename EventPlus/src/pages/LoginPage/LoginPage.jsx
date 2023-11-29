import React, { useState } from "react";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import loginImage from "../../assets/images/login.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { loginResource } from "../../services/service";

import "./LoginPage.css";
import "UserContext, userDecodeToken"

const LoginPage = () => {
  const [user, setUser] = useState({ email: "gabriel@api.com", senha: "" });
  const [userData, setUsarData] = useState({})
  // const [notifyUser, setNotifyUser] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.senha.length >= 6 && user.email.length >= 6) {
      try {
        const promise = await api.post(loginResource, {
          email: user.email,
          senha: user.senha,
        });

        const userFullToken = userDecodeToken(promise.data.token);
        setUserData(userFullToken);

        localStorafe.setItem("token", JSON.stringify(userFullToken))


      } catch (error) {
        alert("Verifique os dados e a conexão com a internet!");

        console.log("dados do usuário");
        console.log(promise.data);
      }
    } else {
      alert("tudo errado");
    }

    console.log("dados de login");
    console.log(user);
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={loginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              className="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({ ...user, email: e.target.value.trim() });
              }}
              placeholder="Username"
            />
            <Input
              className="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({ ...user, senha: e.target.value.trim() });
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              className="frm-login__button"
              onClick={() => {}}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
