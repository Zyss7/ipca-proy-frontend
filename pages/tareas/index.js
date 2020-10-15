import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import TareasTable from "@components/tareas/tareasTable";
import PrivateLayout from "@layouts/privateLayout";
import { Tarea } from "@services/Tareas.service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const TareasContainer = () => {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = () => {
    setCargando(true);
    Tarea.getAll().then((res) => {
      setData(res);
      setCargando(false);
    });
  };

  return (
    <PrivateLayout>
      <LoadingWrapper loading={cargando}>
        <main className='container-fluid'>
          <h1 className='text-center display-4 my-5'>
            Tareas
            <Link href='/tareas/form'>
              <a>
                <AiOutlinePlusCircle color='green' className='pointer' />
              </a>
            </Link>
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
