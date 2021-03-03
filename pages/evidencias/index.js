import LoadingWrapper from '@components/Loadings/LoadingWrapper';
import PrivateLayout from '@layouts/privateLayout';
import useCustomRouter from 'hooks/useCustomRouter';
import useTareas from 'hooks/useTareas';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';

const EvidenciasPage = ({ tarea, alumno }) => {
  const { getTareaById } = useTareas();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { goTo } = useCustomRouter();

  useEffect(() => {
    setLoading(true);
    getTareaById(tarea).then((res) => {
      const alumnoTarea = res.alumnos.find((item) => item.id == alumno);

      setData({
        ...res,
        alumno: alumnoTarea,
      });
      setLoading(false);
    });
  }, []);

  return (
    <PrivateLayout>
      <LoadingWrapper loading={loading}>
        <main className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <Button icon="pi pi-arrow-left" onClick={goTo('/tareas')} />
            </div>
            <div className="col-md-11">
              <h4>
                <span className="text-primary">Tarea: </span>
                {data?.titulo}
              </h4>
              <h5>
                <span className="text-primary">Alumno: </span>
                {data?.alumno.str}
              </h5>
              <h5 className="mt-4 text-primary">Evidencias: </h5>
              <div dangerouslySetInnerHTML={{ __html: data?.alumno?.evidencia }} />
            </div>
          </div>
        </main>
      </LoadingWrapper>
    </PrivateLayout>
  );
};

EvidenciasPage.getInitialProps = ({ query }) => query;

export default EvidenciasPage;
