import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Titulo/Titulo";
import TableEvA from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, { eventsResource,myEventsResource  } from "../../services/service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    setShowSpinner(true);

    async function loadEventsType() {
      if(tipoEvento === "1"){//chamar api todos os eventos
        try {
          const retornoEventos = await api.get(eventsResource)
          setEventos(retornoEventos.data)
          console.log(retornoEventos.data);
        } catch (error) {
          alert("erro na api")
        }
      }else if (tipoEvento === "2"){// chamar api meus eventos
        try {
          const retornoEventos = await api.get(`${myEventsResource}/${userData.userId}`);
          const arrEventos = [];

          retornoEventos.data.forEach( e => {
            arrEventos.push(e.evento);
          });
          setEventos(arrEventos);

        } catch (error) {
          alert("erro na api")
        }
      }else{
        setEventos([]);
      }
      setShowSpinner(false);
    }
    

    loadEventsType();
  }, [tipoEvento, userData.userId]);


  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
  }
  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            fnManipulator={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <TableEvA
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
