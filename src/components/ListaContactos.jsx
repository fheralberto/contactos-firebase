import styled from "styled-components";
import db from "../firebase/fifebaseConfig";
import { useState, useEffect } from "react";
import Contacto from "./contacto";
import { collection, onSnapshot } from "firebase/firestore";

const ListaContactos = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, "usuarios"),
      (snapshot) => {
        const arregloUsuarios = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setContactos(arregloUsuarios);
        // console.log(snapshot.docs[0].data());
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    contactos.length > 0 && (
      <ContenedorContactos>
        {contactos.map((contacto) => (
          <Contacto
            key={contacto.id}
            id={contacto.id}
            nombre={contacto.nombre}
            correo={contacto.correo}
          />
        ))}
      </ContenedorContactos>
    )
  );
};

const ContenedorContactos = styled.div`
  padding: 2rem;
`;
export default ListaContactos;
