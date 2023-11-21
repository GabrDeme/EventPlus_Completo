import React, { useState } from "react";
import './Header.css';

//import componentes
import Container from '../Container/Container';
import Nav from '../Nav/Nav';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario';

//import das imagens
import menubar from '../../assets/images/menubar.png'

const Header = () => {

  const [exibeNavbar, setExibeNavbar] = useState(false);
  
  return (
    <header className="headerpage">
      <Container>
        <div className="header-flex">

          <img 
          src={menubar} 
          alt="Imagem menu de barras. Serve para exibir ou esocnder o menu no smartphone" 
          onClick={() => {setExibeNavbar(true)}} 
          className="headerpage__menubar"
          />
{/* 
          <button onClick={() => {setExibeNavBar(false)}} >test</button> */}

          <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar}/>
          <PerfilUsuario />
        </div>
      </Container>
    </header>
  );
};

export default Header;
