import React from "react";

const CardInfoUsuario = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <h4>Informacion del Usuario</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="row justify-content-around">
          <div className="col-5">
            <img alt="IMAGEN" />
          </div>

          <div className="col-7">
            <h5>Nombres y Apellidos:</h5>
            <h6>Sebastian Villa</h6>

            <h5>Username:</h5>
            <h6>Sebas12345</h6>

            <h5>Representado/s:</h5>
            {[1, 2].map((rep, index) => (
              <h6 key={index}>Alejandro</h6>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfoUsuario;