import useUsuario from 'hooks/useUsuario';
import React from 'react';

const CardInfoUsuario = () => {
  const { usuario } = useUsuario();

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <h4>Informacion del Usuario</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="row justify-content-around">
          <div className="col-11 col-md-5 align-self-center">
            <img
              className="img-fluid"
              src={
                usuario?.persona?.foto ||
                'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'
              }
              alt="IMAGEN"
            />
          </div>

          <div className="col-11 col-md-7">
            <h5>Nombres y Apellidos:</h5>
            <h6>{usuario?.persona?.str}</h6>
            <hr />
            <h5>Username:</h5>
            <h6>{usuario?.persona?.usuario?.username}</h6>
            <hr />
            <h5>Ingreso como:</h5>
            <h6>{usuario?.rol}</h6>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CardInfoUsuario;
