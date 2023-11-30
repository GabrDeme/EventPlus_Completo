import React from "react";
import "./Nav.css";

import { Link } from "react-router-dom";

//import imagens
import logMobile from "../../assets/images/logo-white.svg";
import logDesktop from "../../assets/images/logo-pink.svg";

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
  console.log(`${exibeNavbar}`);

  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span
        className="navbar__close"
        onClick={() => {
          setExibeNavbar(false)
        }}
      >
        X
      </span>

      <Link to="/" className="eventlogo">
        <img
          className="eventlogo__logo-image"
          src={window.innerWidth >= 992 ? logDesktop : logMobile}
          alt="Event Plus Logo"
        />
      </Link>

      <div className="navbar__items-box">

        <Link onClick={() => {setExibeNavbar(false)}} to="/" className="navbar__item">Home</Link>
        <Link onClick={() => {setExibeNavbar(false)}} to="/eventos" className="navbar__item">Eventos</Link>
        <Link onClick={() => {setExibeNavbar(false)}} to="/tiposeventos" className="navbar__item">Tipos de Evento</Link>
        {/* <Link onClick={() => {setExibeNavbar(false)}} to="/login" className="navbar__item">Login</Link> */}
        {/* <Link onClick={() => {setExibeNavbar(false)}} to="/teste" className="navbar__item">Teste</Link> */}

      </div>
    </nav>
  );
};

export default Nav;
