import React from "react";
import "./ContactSection.css";
import Titulo from "../Titulo/Titulo";

import contactImg from "../../assets/images/contato-map.png";

const ContactSection = () => {
  return (
    <section className="contato">
      <Titulo titleText={"Contato"} />

      <div className="contato__endereco-box">
        <img
          src={contactImg}
          alt="Imagem ilustrativa de um mapa"
          className="contato__img-map"
        />
        <p>
          Rua Niterói, 180 - Centro <br />
          São Caetano do Sul - SP <br />
          <div className="telephone_contact">
            <a href="tel:+551142252000" className="contato__telefone">
              (11) 4225-2000
            </a>
          </div>
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
