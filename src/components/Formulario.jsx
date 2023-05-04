import React, { useState } from "react";
import styled from "styled-components";
import db from "../firebase/fifebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Escribiendo..." + nombre + " " + correo);
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre,
        correo,
      });
      console.log("Documento agregado con ID: ", docRef.id);
      setNombre("");
      setCorreo("");
    } catch (e) {
      console.error("Error agregando documento: ", e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder="Usuario"
        type="text"
        name="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <Input
        placeholder="email"
        type="email"
        name="correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

const Input = styled.input`
  outline: none;
  padding: 0.2rem;
  margin-right: 1rem;
  margin-top: 1.5rem;
  border: 2px solid rgba(0, 0, 0, 0.2);
  transition: 0.5s ease border-color;

  &:focus {
    border-color: #3d76e9;
  }
`;

export default Formulario;
