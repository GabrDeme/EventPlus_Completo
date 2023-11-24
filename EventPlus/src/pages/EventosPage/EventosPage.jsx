import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Titulo from "../../components/Titulo/Titulo";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventoImage from "../../assets/images/evento.svg";
import {  Select,  Input,  Button,} from "../../components/FormComponents/FormComponents";
import TableE from "./TableE/TableE";
import Notifcation from "../../components/Notification/Notification";
import api, {  eventsResource,  eventsTypeResource,} from "../../services/service";
import Spinner from "../../components/Spinner/Spinner";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [idEvento, setIdEvento] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [evento, setEvento] = useState([]);
  const [tipoEvento, setTipoEvento] = useState([]);
  const [idTipoEvento, setIdTipoEvento] = useState([]);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const ID_INSTITUICAO = "0577d714-836b-40c4-87a2-8be03d136588";

  /////////////////////////////////USE EFFECT/////////////////////////////////
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

  useEffect(() => {
    async function loadEventsType() {
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEvento(retorno.data);
      } catch (error) {}
    }
    loadEventsType();
  }, []);

  /////////////////////////////////CADASTRAR/////////////////////////////////
  async function handleSubmitE(e) {
    e.preventDefault();
    setShowSpinner(true);
    if (nome.trim().length < 7) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "O título deve ter no mínimo 7 caracteres",
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok",
        showMessage: true,
      });
      return;
    }
    try {
      const retorno = await api.post(eventsResource, {
        nomeEvento: nome,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: ID_INSTITUICAO,
      });
      const buscaEventos = await api.get(eventsResource);
      setEvento(buscaEventos.data);
    } catch (error) {
      alert("erro");
    }
    setShowSpinner(false);
  }
  /////////////////////////////////EDITAR/////////////////////////////////
  async function handleUpdateE(e) {
    e.preventDefault();
    setShowSpinner(true);

    try {
      const retorno = await api.put(eventsResource + "/" + idEvento, {
        nomeEvento : nome,
        descricao : descricao,
        idTipoEvento : idTipoEvento,
        dataEvento : dataEvento,
        idInstituicao : ID_INSTITUICAO,
      });
      
      if (nome.trim().length < 7) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "O cadastro deve ter no mínimo 7 caracteres.",
          imgIcon: "warning",
          imgAlt:
            "Imagem de ilustração de aviso. Boneco batendo na exclamação.",
          showMessage: true,
        });
        return;
      }

      if (retorno.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Atualizado com sucesso`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok",
          showMessage: true,
        });

        const buscaEventos = await api.get(eventsResource);
        setEvento(buscaEventos.data);
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `erro no atualizar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustracao de erro. Rapaz segurando um balao com simbolo",
        showMessage: true,
      });
    }
    setShowSpinner(false);

  }

  async function showUpdateFormE(idElement) {
    setFrmEdit(true);
    setIdEvento(idElement);

    try {
      const retornoEdit = await api.get(`${eventsResource}/${idElement}`);
      setFrmEdit(true);
      setNome(retornoEdit.data.nomeEvento);
      setDescricao(retornoEdit.data.descricao);
      setIdTipoEvento(retornoEdit.data.idTipoEvento);
      
      const eventData = retornoEdit.data.dataEvento;
      const formatteDate = new Date(eventData).toISOString().split("T")[0];
      setDataEvento(formatteDate)

      setIdEvento(idElement);

      

    } catch (error) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "Não foi possível editar o evento",
        imgIcon: "warning",
        imgAlt:
          "Imagem de aviso, mulher na frente de um ponto de exclamação",
        showMessage: true,
      });
    }
  }

  async function editActionAbortE(e) {
    setFrmEdit(false);
    setNome("");
    setDescricao(""); 
    setDataEvento("");
    setIdTipoEvento("");
  }

  /////////////////////////////////DELETAR/////////////////////////////////
  async function handleDelete(idElement) {
    try {
      //promise que chama a rota delete passando o id do evento
      const promise = await api.delete(`${eventsResource}/${idElement}`);
      //condição com mensagem para confirmar a exclusão
      if (window.confirm("confirma a exclusão?")) {
        if (promise.status === 204) {
          setNotifyUser({
            titleNote: "Exclusão",
            textNote: `Evento apagado com sucesso`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
            showMessage: true,
          });

          //atualiza os dados da api dando um get
          const buscaEventos = await api.get(eventsResource);

          setEvento(buscaEventos.data);
        }
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "erro",
        textNote: `problema ao apagar,verifique a conexão`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });
    }
  }
  /////////////////////////////////FUNÇÃO PARA CHAMAR TIPOS EVENTOS/////////////////////////////////
  ////////////////////////////////////////////NO LISTAR/////////////////////////////////////////////
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
      {<Notifcation {...notifyUser} setNotifyUser={setNotifyUser} />}

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
                      defaultValue={idTipoEvento}
                      manipulationFunction={(e) => {
                        setIdTipoEvento(e.target.value);
                      }}
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
                      defaultValue={idTipoEvento}
                      manipulationFunction={(e) => {
                        setIdTipoEvento(e.target.value);
                      }}
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

                    <div className="buttons-editbox">
                      <Button
                      textButton="Atualizar"
                      id="Atualizar"
                      name="Atualizar"
                      type="submit"
                      additionalClass={"button-component--middle"}
                    />
                    <Button
                      textButton="Cancelar"
                      id="Cancelar"
                      name="Cancelar"
                      type="submit"
                      manipulationFunction={editActionAbortE} 
                      additionalClass={"button-component--middle"}////
                    />
                    </div>              
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
              fnUpdate={showUpdateFormE}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
