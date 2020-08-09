import React from "react";
import MensajesTable from "@components/mensajes/mensajesTable";
import PrivateLayout from "@layouts/privateLayout";

const MensajesContainer = () => {
  return (
    <PrivateLayout>
      <main className="container-fluid">
        <h1 className="text-center display-4">Mensajes</h1>
        <div className="row justify-content-center">
          <div className="col-lg-8 align-self-center ">
            <MensajesTable />
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

export default MensajesContainer;
