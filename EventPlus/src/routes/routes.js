import React from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import EventosPage from "../pages/EventosPage/EventosPage";
import HomePage from "../pages/HomePage/HomePage";
import TipoEventosPage from "../pages/TipoEventosPage/TipoEventosPage";
import LoginPage from "../pages/LoginPage/LoginPage";
// import TestePage from "./pages/TestePage/TestePage";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";


const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path={"/"} exact />
        <Route
          element={
            <PrivateRoute>
              <EventosPage />
            </PrivateRoute>
          }
          path={"/eventos"}
        />
        <Route
          element={
            <PrivateRoute >
              <EventosAlunoPage />
            </PrivateRoute>
          }
          path={"/eventos-aluno"}
        />
        <Route
          path="/tiposeventos"
          element={
            <PrivateRoute>
              <TipoEventosPage />
            </PrivateRoute>
          }
        />
        <Route element={<LoginPage />} path={"/login"} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;