import { Usuario } from "@services/Usuario.service";
import React, { useEffect, useState } from "react";

const CardInfoUsuario = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(Usuario.getUsuarioStorage());
  }, []);

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title'>
          <h4>Informacion del Usuario</h4>
        </div>
      </div>
      <div className='card-body'>
        <div className='row justify-content-around'>
          <div className='col-5 align-self-center'>
            <img
              className='img-fluid'
              src='https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'
              alt='IMAGEN'
            />
          </div>

          <div className='col-7'>
            <h5>Nombres y Apellidos:</h5>
            <h6>{usuario?.persona?.str}</h6>
            <hr />
            <h5>Username:</h5>
            <h6>{usuario?.username}</h6>
            <hr />
            <h5>Ingreso como:</h5>
            <h6>{usuario?.grupoStr}</h6>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CardInfoUsuario;
