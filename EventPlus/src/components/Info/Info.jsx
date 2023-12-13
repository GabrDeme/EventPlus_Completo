import React, {useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import {  Input } from "../FormComponents/FormComponents";
import "./Info.css";

const Modal = ({
  modalTitle = "Feedback",
  comentaryText = "Não informado. Não informado. Não informado.",
  showHideInfo = false,
  fnGet = null,
  userId = null,
  idEvento = null,
}) => {
  const [comentarioDesc, setComentarioDesc] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    await fnGet(userId, idEvento);
  }

  return (
    <div className="modal">
      <article className="modal__box">
        <h3 className="modal__title">
          {modalTitle}
          <span
            className="modal__close"
            onClick={() => showHideInfo(idEvento)}
          >
            x
          </span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={async () => {
              await carregarDados();
            }}
          />

          <p className="comentary__text">{comentaryText}</p>

          <hr className="comentary__separator" />
        </div>

        <Input
          placeholder="Escreva seu comentário..."
          additionalClass="comentary__entry"
          value={comentarioDesc}
          manipulationFunction={(e) => {
            setComentarioDesc(e.target.value);
          }}
        />
        {/* {comentarioDesc} */}
        
        
      </article>
    </div>
  );
};

export default Modal;
