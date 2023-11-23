import React, { useEffect, useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Titulo/Titulo";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../services/service";
import TableTp from "./TableTp/TableTp";
import Notifcation from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner"

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState(null);
  const [tipoEventos, setTipoEventos] = useState([]);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true)
      setTimeout(() => { console.log("esperando");},2000)
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }

      setShowSpinner(false)
    }
    // chama a função/api no carregamento da página/componente
    loadEventsType();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setShowSpinner(true)

    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "O título deve ter no mínimo 3 caracteres",
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok",
        showMessage: true,
      });

      //alert("O titulo deve ter pelo menos 3 caracteres");
    } else {
      try {
        await api.post(eventsTypeResource, {
          titulo: titulo,
        });
        const buscaEventos = await api.get(eventsTypeResource);

        setTipoEventos(buscaEventos.data);

        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `${titulo} Cadastrado com sucesso`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok",
          showMessage: true,
        });
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `erro no cadastrar`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustracao de erro. Rapaz segurando um balao com simbolo",
          showMessage: true,
        });
      }
      setShowSpinner(false)
    }
  }

  /*****************Editar dados******************/
  //mostra o form de edição
  async function showUpdateForm(idElement) {
    setFrmEdit(true);
    setIdEvento(idElement);
    setShowSpinner(true)

    try {
      const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(retorno.data.titulo);
      console.log(retorno.data);
    } catch (error) {}
    setShowSpinner(false)
  }
  //cancelar a tela/ação de edição (volta para o form de cadastro)
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null);
  }
  //cadastrar a atualização da api////////////////////////////////////////////
  async function handleUpdate(e) {
    e.preventDefault();
    setShowSpinner(true)

    try {
      const retorno = await api.put(eventsTypeResource + "/" + idEvento, {
        titulo: titulo,
      });
      
      if (titulo.trim().length < 3) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "O cadastro deve ter no mínimo 3 caracteres.",
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

        const buscaEventos = await api.get(eventsTypeResource);
        setTipoEventos(buscaEventos.data);
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

    alert(`editando o cadastro` + e.target.value);

    setShowSpinner(false);

    //const idTipoEvento = frmEdit.idTipoEvento; //frmEditData
  }

  /*****************Apagar dados******************/
  //apaga o tipo de evento da api
  async function handleDelete(idElement) {
    if (!window.confirm("Confirmar a exclusão?")) {
      return;
    }
    try {
      const promise = await api.delete(`${eventsTypeResource}/${idElement}`);

      if ((promise.status = 204)) {
        const buscaEventos = await api.get(eventsTypeResource);
        setTipoEventos(buscaEventos.data);

        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `${titulo} excluido com sucesso`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok",
          showMessage: true,
        });
      }
    } catch (error) {
      //alert(`Não foi possível deletar: ${idElement}`);
    }

    // alert(`Vamos apagar o evento de id: ${idElement}`);
  }

  return (
    <>
      {<Notifcation {...notifyUser} setNotifyUser={setNotifyUser} />}

      {showSpinner ? <Spinner /> : null}

      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro Tipo de Eventos"} />

              <ImageIllustrator imageRender={tipoEventoImage} />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  // Cadastro Tipos Eventos
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
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
                  //Editar Tipo Eventos
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Titulo"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <div className="buttons-editbox">
                      <Button
                        textButton="Atualizar"
                        id="Atualizar"
                        name="Atualizar"
                        type="submit"
                      />
                      <Button
                        textButton="Cancelar"
                        id="cancelar"
                        name="cancelar"
                        type="submit"
                        manipulationFunction={editActionAbort}
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
            <Title titleText={"Lista Tipo de Eventos"} color="white" />
            <TableTp
              dados={tipoEventos}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
