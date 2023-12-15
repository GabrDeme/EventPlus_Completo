import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Titulo/Titulo";
// import TableAn from "./TableAn/TableAn";
import Container from "../../components/Container/Container";
import Spinner from "../../components/Spinner/Spinner";
import Info from "../../components/Info/Info";
import api, {
  eventsResource,
  myEventsResource,
  lastEventResource,
  allowedCommentsResource,
} from "../../services/service";
import "./EventosAnterioresPage.css";
import { UserContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const EventosAnterioresPage = () => {
  const {idEvent} = useParams()

  const [quaisEventos, setQuaisEventos] = useState([]);

  const [eventos, setEventos] = useState([]);
  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const { userData } = useContext(UserContext);
  const [idEvento, setIdEvento] = useState("");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]); //

  async function loadEventsType() {
    setShowSpinner(true);
    if (tipoEvento === "1") {
      try {
        
        const todosEventos = await api.get(lastEventResource);

        // const eventosMarcados = //verificaPresenca
        // (
        //   todosEventos.data
        // );

        setEventos(todosEventos.data);
///////////////////////////////////////////////////////////////////////////**////////////////////////////////////////////////////////////////////////////
        console.clear();

        console.log("TODOS OS EVENTOS");
        console.log(todosEventos.data);

      } catch (error) {
        //colocar o notification
        console.log("Erro na API");
        console.log(error);
      }
    } else if (tipoEvento === "2") {
      /**
       * Lista os meus eventos (PresencasEventos)
       * retorna um formato diferente de array
       */
      try {
        const retornoEventos = await api.get(
          `${myEventsResource}/${userData.userId}`
        );
        const arrEventos = []; //array vazio

        retornoEventos.data.forEach((e) => {
          arrEventos.push({
            ...e.evento,
            situacao: e.situacao,
            idPresencaEvento: e.idPresencaEvento,
          });
        });
        setEventos(arrEventos);
      } catch (error) {
        console.log("Erro na API");
        console.log(error);
      }
    } else {
      setEventos([]);
    }
    setShowSpinner(false);
  }


  
  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  const showHideInfo = (idEvent) => {
    setShowInfo(showInfo ? false : true);
    setIdEvento(idEvent);
  };



  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos Anteriores"} additionalClass="custom-title" />

        
          {/* <TableAn
            dados={eventos}
            fnShowInfo={showHideInfo}
          /> */}
        </Container>
      </MainContent>
      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showInfo ? (
        <Info
          // userId={userData.userId}
          showHideInfo={showHideInfo}
        //   fnGet={loadMyCommentary}
        //   fnPost={postMyCommentary}
        //   fnDelete={commentaryRemove}
        //   comentaryText={comentario}
          userId={userData.userId}
          idEvento={idEvento}
        //   idComentario={idComentario}
        />
      ) : null}
    </>
  );
};

export default EventosAnterioresPage;
