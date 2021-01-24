import CardInfoUsuario from "@components/dashboard/cardInfoUsuario";
import MensajesSinLeerTable from "@components/dashboard/mensajesSinLeerTable";
import TareasPendientesTable from "@components/dashboard/tareasPendientesTable";
import PrivateLayout from "@layouts/privateLayout";
import React from "react";

const DashboardContainer = () => {
  return (
    <PrivateLayout>
      <main className='container-fluid'>
        <div className='row mt-5'>
          <div className='col-lg-4 align-self-center'>
            <CardInfoUsuario />
          </div>

          <div className='col-lg-7 align-self-center '>
            <TareasPendientesTable />
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

export default DashboardContainer;
