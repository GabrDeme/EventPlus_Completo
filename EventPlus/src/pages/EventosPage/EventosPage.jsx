import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Titulo from "../../components/Titulo/Titulo";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventoImage from "../../assets/images/evento.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import TableTp from "./TableE/TableE";
// import Notifcation from "../../components/Notification/Notification";
import api, { eventsTypeResource } from "../../services/service";
import Spinner from "../../components/Spinner/Spinner";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [eventos, setEventos] = useState([]);
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

  async function handleSubmit(e) {
    e.preventDefault();
    setShowSpinner(true)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {showSpinner ? <Spinner /> : null}

      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo
                titleText={"Página Eventos"}
                color="/"
                additionalClass="margim-acima"
              />

              <ImageIllustrator imageRender={eventoImage} />

              <form
                className="ftipo-evento"
                // onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                <>
                  <Input
                    id="nome"
                    placeholder="Nome"
                    name={"nome"}
                    type={"text"}
                    required={"required"}
                    value={nome}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);
                    }}
                  />
                  <Input
                    id="descricao"
                    placeholder="Descrição"
                    name={"descricao"}
                    type={"text"}
                    required={"required"}
                    value={descricao}
                    manipulationFunction={(e) => {
                      setDescricao(e.target.value);
                    }}
                  />
                  {/* <Input
                    id="descricao"
                    placeholder="Descrição"
                    name={"descricao"}
                    type={"text"}
                    required={"required"}
                    value={descricao}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);
                    }}
                  /> */}
                  <Input
                    id="dataEvento"
                    placeholder="dd/mm/aaaa"
                    name={"dataEvento"}
                    type={"date"}
                    required={"required"}
                    value={dataEvento}
                    manipulationFunction={(e) => {
                      setDataEvento(e.target.value);
                    }}
                  />
                  <Button
                      textButton="Cadastrar"
                      id="Cadastrar"
                      name="Cadastrar"
                      type="submit"
                    />
                </>
              </form>
            </div>
          </Container>
        </section>
        <section className="lista-eventos-section">
          <Container>
            <Titulo titleText={"Lista Tipo de Eventos"} color="white" />
            <TableTp
              dados={eventos}
              // fnUpdate={showUpdateForm}
              // fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
