import "./App.css";
import styled from "styled-components";
import Formulario from "./components/Formulario";
import ListaContactos from "./components/ListaContactos";

function App() {
  return (
    <Contenedor className="App">
      <Titulo>Lista de contactos</Titulo>
      <Formulario />
      <ListaContactos />
    </Contenedor>
  );
}

const Contenedor = styled.div`
  background-color: #44403c;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Titulo = styled.h1`
  color: #d6d3d1;
`;

export default App;
