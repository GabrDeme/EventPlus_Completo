import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Titulo from "../../components/Titulo/Titulo";
import api, { eventsTypeResource } from "../../services/service";
import Spinner from "../../components/Spinner/Spinner";

const EventosPage = () => {
  const [Eventos, setEventos] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);
      try {
        const retorno = await api.get(eventsTypeResource);
        setEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }

      setShowSpinner(false);
    }
    // chama a função/api no carregamento da página/componente
    loadEventsType();
  }, []);
////////////////////////////////////////////////////////////////
  return (
    <>
      {showSpinner ? <Spinner /> : null}

      <div>
        <Titulo
          titleText={"Página Eventos"}
          color="/"
          additionalClass="margim-acima"
        />
      </div>
    </>
  );
};

export default EventosPage;
