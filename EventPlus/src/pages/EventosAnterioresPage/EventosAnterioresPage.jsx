import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Titulo/Titulo";
import TableAn from "./TableAn/TableAn";
import Container from "../../components/Container/Container";
// import Spinner from "../../components/Spinner/Spinner";
import api, {
  eventsResource,
  eventsTypeResource,
  myEventsResource,
  lastEventResource,
  allowedCommentsResource,
} from "../../services/service";

import "./EventosAnterioresPage.css";
import { UserContext } from "../../context/AuthContext";
import { dateFormatDbToView } from "../../utils/stringFunctions";

const EventosAnterioresPage = () => {
  // state do menu mobile

  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState();


  // recupera os dados globais do usuário
  // const { userData } = useContext(UserContext);
  const [idEvento, setIdEvento] = useState("");

  useEffect(() => {
    async function loadEvents(id) {
      try {
        const myEvents = await api.get(`${eventsResource}/${id}`);
        const myTypeEvents = await api.get(
          `${eventsTypeResource}/${myEvents.data.idTipoEvento}`
        );

        setNomeEvento(myEvents.data.nomeEvento);
        setDescricao(myEvents.data.descricao);
        // setTipoEvento(myTypeEvents.data.titulo);
        // setDate(dateFormatDbToView(myEvents.data.dataEvento));

        const myComments = await api.get(`${allowedCommentsResource}${id}`);
        setComments(myComments.data);
      } catch (error) {
        console.log("Não foi");
      }
    }

    loadEvents(idEvento);
  }, []);

  return (
    <>
      <MainContent>
        <section>
          <Container>
            <Title titleText={"Ultimos Evento"} />

            <TableAn
              nome={nomeEvento}
              descricao={descricao}
              tipo={tipoEvento}
              // data={date}
              comentarios={comments}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosAnterioresPage;
