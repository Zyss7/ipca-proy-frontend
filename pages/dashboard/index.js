import CardInfoUsuario from "@components/dashboard/cardInfoUsuario";
import PrivateLayout from "@layouts/privateLayout";
import React from "react";
import TareasPendientesTable from "@components/dashboard/tareasPendientesTable";
import MensajesSinLeerTable from "@components/dashboard/mensajesSinLeerTable";

const DashboardContainer = () => {
  return (
    <PrivateLayout>
      <main className="container-fluid">
        <div className="row">
          <div className="col-lg-4 align-self-center">
            <CardInfoUsuario />
          </div>

          <div className="col-lg-7 align-self-center ">
            <TareasPendientesTable />
            <MensajesSinLeerTable />
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

export default DashboardContainer;
