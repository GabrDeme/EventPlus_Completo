import React, { useEffect, useState } from "react";
import api from "../../services/service";
import "./HomePage.css";

import MainContent from "../../components/Main/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Titulo from "../../components/Titulo/Titulo";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
// import { nextEventResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]); //dados mocados
  const [notifyUser, setNotifyUser] = useState();

  {
    useEffect(() => {
      //roda somente na inicialização do componente
      async function getNextEvents() {
        try {
          const promise = await api.get("/Evento/ListarProximos");
          // const promise = await api.get(`${nextEventResource}`);

          const dados = await promise.data;

          setNextEvents(dados);
        } catch (error) {
          setNotifyUser({
            titleNote: "Erro",
            textNote:
              "Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet.",
            imgIcon: "danger",
            imgAlt:
              "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo X.",
            showMessage: true,
          });
        }
      }

      getNextEvents(); //roda a função
    }, []);
  }

  return (
    <div>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      <MainContent>
        <Banner />

        {/* PRÓXIMOS EVENTOS */}
        <section className="proximos-eventos">
          <Container>
            <Titulo titleText={"Próximos Eventos"} />

            <div className="events-box">
              {nextEvents.map((event) => {
                return (
                  <NextEvent
                    id={event.id}
                    eventDate={event.dataEvento}
                    title={event.nomeEvento}
                    description={event.descricao}
                    idEvent={event.idEvento}
                  />
                );
              })}
            </div>
          </Container>
        </section>

        <VisionSection />
        <ContactSection />
      </MainContent>
    </div>
  );
};

export default HomePage;
