import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import TareasTable from "@components/tareas/tareasTable";
import PrivateLayout from "@layouts/privateLayout";
import { Tarea } from "@services/Tareas.service";
import { useUsuario, useUsuarioIsLoading } from "context/UsuarioContext";
import useCustomRouter from "hooks/useCustomRouter";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const TareasContainer = () => {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useCustomRouter();
  const [usuario] = useUsuario();
  const [isUsuarioLoading] = useUsuarioIsLoading();

  useEffect(() => {
    cargarTareas();
    console.log("TEST");
  }, [isUsuarioLoading]);

  const cargarTareas = () => {
    setCargando(true);
    if (!isUsuarioLoading) {
      const queryParams = {};

      if (usuario.isAlumno) {
        queryParams.estadoEnvio = "ENVIADO";
      }

      Tarea.getAll(queryParams).then((res) => {
        setData(res);
        console.log(res);
        setCargando(false);
      });
    }
  };

  return (
    <PrivateLayout>
      <LoadingWrapper loading={cargando}>
        <main className='container-fluid'>
          <h1 className='text-center display-4 my-5'>
            Tareas
            {usuario?.isDocente && (
              <AiOutlinePlusCircle
                color='green'
                className='pointer'
                onClick={router.goTo("/tareas/form")}
              />
            )}
          </h1>

          {!cargando && (
            <div className='row justify-content-center'>
              <div className='col-lg-11 align-self-center '>
                <TareasTable data={data} cargarTareas={cargarTareas} />
              </div>
            </div>
          )}
        </main>
      </LoadingWrapper>
    </PrivateLayout>
  );
};

export default TareasContainer;
