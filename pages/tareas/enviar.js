import LoadingWrapper from '@components/Loadings/LoadingWrapper';
import PrivateLayout from '@layouts/privateLayout';
import useCustomRouter from 'hooks/useCustomRouter';
import useTareas from 'hooks/useTareas';
import useUsuario from 'hooks/useUsuario';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const EnviarTareaContainer = ({ id }) => {
  const [cargando, setCargando] = useState(false);

  const [tarea, setTarea] = useState({});

  const [alumnos, setAlumnos] = useState([]);
  const { usuario } = useUsuario();

  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const { getTareaById, update, save } = useTareas();

  const router = useCustomRouter();

  const init = useCallback(() => {
    setLoading(true);
    getTareaById(id).then((res) => {
      setTarea(res);

      const alumnosTemp = usuario.aulas
        .map((aula) =>
          aula.alumnos.map((alumno) => {
            const alumnoTarea = res?.alumnos?.find((a) => a.id === alumno.id);
            return {
              ...alumno,
              enviar: alumnoTarea && true,
              idAula: aula.id,
              aula: aula.nombre,
            };
          }),
        )
        .flat();

      setAlumnos(alumnosTemp);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (id) {
      init();
    } else {
      router.replace('/tareas');
    }
  }, [init]);

  const onCheck = (rowData) => ({ checked }) => {
    setAlumnos(
      alumnos.map((a) => ({
        ...a,
        visto: false,
        estado: 'PENDIENTE',
        enviar: rowData.id === a.id ? checked : a.enviar,
      })),
    );
  };

  const onClickAtras = () => {
    router.push(`/tareas/form?id=${id}`);
  };

  const onClickEnviar = async () => {
    const alumnosEnviar = alumnos.filter((a) => a.enviar === true);

    if (alumnosEnviar.length === 0) {
      return addToast('DEBE SELECCIONAR AL MENOS UN ALUMNO', {
        appearance: 'error',
      });
    }

    tarea.alumnos = alumnosEnviar;

    tarea.estadoEnvio = 'ENVIADO';

    setCargando(true);
    await update(id, tarea);
    addToast(`Se ha enviando la tarea correctamente.`, {
      appearance: 'success',
    });
    setCargando(false);
    router.push('/tareas');
  };

  return (
    <PrivateLayout>
      <LoadingWrapper loading={cargando}>
        <main className="container-fluid">
          <h1 className="text-center my-5">Tarea: {tarea?.titulo}</h1>
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-9 col-xl-8">
              <h1>Seleccione a los alumnos</h1>

              <DataTable
                className="p-datatable-gridlines p-datatable-sm shadow-lg"
                value={alumnos}
                rowHover
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                autoLayout
                emptyMessage="No se han encontrado resultados"
                loading={isLoading}
              >
                <Column
                  header="#"
                  className="text-center"
                  style={{ width: '50px' }}
                  body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
                  headerClassName="text-center"
                />
                <Column
                  header="Estudiante"
                  field="str"
                  filter
                  sortable
                  headerClassName="text-center"
                />
                <Column
                  header="Aula"
                  field="aula"
                  filter
                  sortable
                  headerClassName="text-center"
                />

                <Column
                  style={{ width: '100px', padding: '0 0 0 0' }}
                  header="Enviar"
                  headerClassName="text-center"
                  body={(rowData) => {
                    return (
                      <div className="text-center w-100 py-1">
                        <Checkbox onChange={onCheck(rowData)} checked={rowData.enviar} />
                      </div>
                    );
                  }}
                />
              </DataTable>
            </div>
          </div>

          <div className="row justify-content-center mt-5">
            <div className="col-md-4 my-2">
              <Button
                className="btn-block p-button-outlined p-button-danger"
                label="Regresar"
                onClick={onClickAtras}
              />
            </div>
            <div className="col-md-4 my-2">
              <Button
                className="btn-block p-button-outlined p-button-success"
                label="Enviar"
                onClick={onClickEnviar}
              />
            </div>
          </div>
        </main>
      </LoadingWrapper>
    </PrivateLayout>
  );
};

EnviarTareaContainer.getInitialProps = ({ query }) => {
  return { ...query };
};

export default EnviarTareaContainer;

/*

*/
