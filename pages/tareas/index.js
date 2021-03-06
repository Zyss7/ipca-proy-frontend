import LoadingWrapper from '@components/Loadings/LoadingWrapper';
import TareasTable from '@components/tareas/tareasTable';
import PrivateLayout from '@layouts/privateLayout';
import useAuthEffect from 'hooks/useAuthEffect';
import useCustomRouter from 'hooks/useCustomRouter';
import useTareas from 'hooks/useTareas';
import useUsuario from 'hooks/useUsuario';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const TareasContainer = () => {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useCustomRouter();

  const { usuario } = useUsuario();

  const { getTareas } = useTareas();

  useAuthEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = () => {
    setCargando(true);

    const queryParams = {};

    if (usuario?.isAlumno) {
      queryParams.estadoEnvio = 'ENVIADO';
    }

    getTareas(queryParams).then((res) => {
      setData(res);
      setCargando(false);
    });
  };

  return (
    <PrivateLayout>
      <LoadingWrapper loading={cargando}>
        <main className="container-fluid">
          <h1 className="text-center display-4 my-5">
            Tareas
            {usuario?.isDocente && (
              <AiOutlinePlusCircle
                color="green"
                className="pointer"
                onClick={router.goTo('/tareas/form')}
              />
            )}
          </h1>

          {!cargando && (
            <div className="row justify-content-center">
              <div className="col-lg-11 align-self-center ">
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
