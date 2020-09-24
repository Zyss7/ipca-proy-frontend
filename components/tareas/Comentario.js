import React from "react";
import { Usuario } from "@services/Usuario.service";
import moment from "moment";
import styled from "@emotion/styled";
import { Tarea } from "@services/Tareas.service";

const ComentarioContainer = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid saddlebrown;
  margin-top: 0.5rem;
  & > * {
    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
  }
`;

const Mensaje = styled.p`
  margin: 0.1rem 0 0.1rem 0;
  padding: 0 0 0 0;
`;

const UsuarioMsg = styled.h5`
  font-size: 1rem;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  font-weight: bold;
`;

const Tiempo = styled.small`
  color: blueviolet;
`;

const Eliminar = styled.button`
  background-color: white;
  border: none;
  outline: none;
  color: red;
  margin-left: 1rem;
  &::selection {
    outline: 0.5px solid red;
    border: 0.5px solid red;
  }
`;

const Comentario = ({ idDoc, data }) => {
  const usuario = Usuario.getUsuarioStorage();

  const onClickEliminar = () => {
    console.log(data);

    Tarea.deleteComentario(idDoc, data.id);
  };

  if (usuario.username === data.usuario.username) {
    return (
      <ComentarioContainer>
        <div className='col-12 text-right ' style={{ backgroundColor: "" }}>
          <div className='d-inline-block'>
            <UsuarioMsg>{data.usuario.persona}</UsuarioMsg>
          </div>
          <Mensaje>{data.comentario}</Mensaje>
          <div className='w-100'>
            <Tiempo>Hace {moment(data.fechaEnvio).fromNow(true)}</Tiempo>
            <Eliminar onClick={onClickEliminar}>Eliminar</Eliminar>
          </div>
        </div>
      </ComentarioContainer>
    );
  }

  return (
    <ComentarioContainer>
      <div className='col-12 py-2'>
        <UsuarioMsg>{data.usuario.persona}</UsuarioMsg>
        <Mensaje>{data.comentario}</Mensaje>
        <Tiempo>Hace {moment(data.fechaEnvio).fromNow(true)}</Tiempo>
      </div>
    </ComentarioContainer>
  );
};

export default Comentario;
