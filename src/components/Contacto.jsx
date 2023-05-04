import { useState } from "react";
import styled from "styled-components";
import db from "../firebase/fifebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function Contacto({ id, nombre, correo }) {
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevoCorreo, setNuevoCorreo] = useState(correo);

  const actualizarContacto = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "usuarios", id), {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
      });
      setEditando(false);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContenedorComponente>
      {editando ? (
        <form onSubmit={actualizarContacto}>
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <Input
            type="text"
            name="correo"
            placeholder="Correo"
            value={nuevoCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
          />
          <Boton type="submit">Actualizar</Boton>
        </form>
      ) : (
        <ContenedorContacto>
          <ContenedorDatos>
            <Nombre>{nombre}</Nombre>
            <Correo>{correo}</Correo>
          </ContenedorDatos>
          <ContenedorBotones>
            <Boton onClick={() => setEditando(!editando)}>Editar</Boton>
            <Boton onClick={() => eliminarContacto(id)}>Borrar</Boton>
          </ContenedorBotones>
        </ContenedorContacto>
      )}
    </ContenedorComponente>
  );
}

const ContenedorComponente = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ContenedorDatos = styled.div`
  padding-right: 2rem;
  text-align: left;
`;

const ContenedorContacto = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ContenedorBotones = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Nombre = styled.p`
  font-weight: bold;
`;

const Correo = styled.p`
  font-style: italic;
  color: #6b6b6b;
  padding-bottom: 0.5rem;
`;

const Boton = styled.button`
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  outline: none;
  background-color: #2563eb;
  transition: 0.3s ease background-color;

  &:hover {
    background-color: #3d76e9;
  }
`;

const Input = styled.input`
  outline: none;
  padding: 0.2rem;
  margin-right: 1rem;
  border-radius: 0.2rem;
  border: 2px solid rgba(0, 0, 0, 0.2);
  transition: 0.2s ease border-color;

  &:hover {
    border-color: #3d76e9;
  }
`;

export default Contacto;
