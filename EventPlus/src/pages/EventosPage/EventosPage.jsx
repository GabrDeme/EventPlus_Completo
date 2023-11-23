import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Titulo from "../../components/Titulo/Titulo";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventoImage from "../../assets/images/evento.svg";
import {  Select,  Input,  Button,} from "../../components/FormComponents/FormComponents";
import TableE from "./TableE/TableE";
// import Notifcation from "../../components/Notification/Notification";
import api, {  eventsResource,  eventsTypeResource,} from "../../services/service";
import Spinner from "../../components/Spinner/Spinner";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [evento, setEvento] = useState([]);
  const [tipoEvento, setTipoEvento] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      setShowSpinner(true);
      try {
        const retorno = await api.get(eventsResource);
        setEvento(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }

      setShowSpinner(false);
    }
    // chama a função/api no carregamento da página/componente
    loadEvents();
  }, []);

  /////////////////////////////////CADASTRAR/////////////////////////////////
  async function handleSubmitE(e) {
    e.preventDefault();
    setShowSpinner(true);

    try {
      await api.post(eventsResource, {
        nome: nome,
        descricao: descricao,
        tipoEvento: tipoEvento,
        dataEvento: dataEvento,
      });
      const buscaEventos = await api.get(eventsResource);
      setEvento(buscaEventos.data);
    } catch (error) {
      alert("erro");
    }
  }
  /////////////////////////////////EDITAR/////////////////////////////////
  async function handleUpdateE(e) {
    e.preventDefaul();
    setShowSpinner(true);
  }

  async function editActionAbortE(e) {
    e.preventDefaul();
    setShowSpinner(true);
  }

  /////////////////////////////////DELETAR/////////////////////////////////
  async function handleDelete(idElement) {
    try {
      //promise que chama a rota delete passando o id do evento
      const promise = await api.delete(`${eventsResource}/${idElement}`);
      //condição com mensagem para confirmar a exclusão
      if (window.confirm("confirma a exclusão?")) {

        if (promise.status === 204) {
          // setNotifyUser({
          //   titleNote: "Exclusão",
          //   textNote: `Evento apagado com sucesso`,
          //   imgIcon: "success",
          //   imgAlt:
          //     "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
          //   showMessage: true,
          // });

          //atualiza os dados da api dando um get
          const buscaEventos = await api.get(eventsResource);

          setEvento(buscaEventos.data);
        }
      }
    } catch (error) {
      // setNotifyUser({
      //   titleNote: "erro",
      //   textNote: `problema ao apagar,verifique a conexão`,
      //   imgIcon: "danger",
      //   imgAlt:
      //     "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
      //   showMessage: true,
      // });
    }
  }
  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function loadEventsType() {
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEvento(retorno.data);
      } catch (error) {}
    }
    loadEventsType();
  }, []);

  function bglh(retornoApi) {
    let arrayOptions = [];
    retornoApi.forEach((e) => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });
    return arrayOptions;
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
                onSubmit={frmEdit ? handleUpdateE : handleSubmitE}
              >
                {!frmEdit ? (
                  // Cadastro Eventos
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

                    <Select
                      id="TipoEvento"
                      name={"tipoEvento"}
                      required={"required"}
                      options={bglh(tipoEvento)}
                    />

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
                ) : (
                  //Editar Eventos
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

                    <Select
                      id="TipoEvento"
                      name={"tipoEvento"}
                      required={"required"}
                      options={bglh(tipoEvento)}
                    />

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
                    <Button
                      textButton="Cancelar"
                      id="Cancelar"
                      name="Cancelar"
                      type="submit"
                      manipulationFunction={editActionAbortE} ////
                    />
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <Titulo titleText={"Lista de Eventos"} color="white" />
            <TableE
              dados={evento}
              // fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
