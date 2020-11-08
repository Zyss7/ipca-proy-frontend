import PrivateLayout from "@layouts/privateLayout";
import { Tarea } from "@services/Tareas.service";
import { useUsuario, useUsuarioIsLoading } from "context/UsuarioContext";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

const EnviarTareaContainer = ({ id }) => {
  const [tarea, setTarea] = useState({});

  const [alumnos, setAlumnos] = useState([]);
  const [usuario] = useUsuario();
  const [isUsuarioLoading] = useUsuarioIsLoading();
  const { addToast } = useToasts();

  const router = useRouter();

  const init = useCallback(() => {
    if (!isUsuarioLoading) {
      Tarea.getById(id).then((res) => {
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
            })
          )
          .flat();

        setAlumnos(alumnosTemp);
      });
    }
  }, [isUsuarioLoading]);

  useEffect(() => {
    if (id) {
      init();
    } else {
      router.replace("/tareas");
    }
  }, [init, isUsuarioLoading]);

  const onCheck = (rowData) => ({ checked }) => {
    setAlumnos(
      alumnos.map((a) => ({
        ...a,
        enviar: rowData.id === a.id ? checked : a.enviar,
      }))
    );
  };

  const onClickAtras = () => {
    router.push(`/tareas/form?id=${id}`);
  };

  const onClickEnviar = async () => {
    const alumnosEnviar = alumnos.filter((a) => a.enviar === true);

    if (alumnosEnviar.length === 0) {
      return addToast("DEBE SELECCIONAR AL MENOS UN ALUMNO", {
        appearance: "error",
      });
    }

    tarea.alumnos = alumnosEnviar;

    tarea.estadoEnvio = "ENVIADO";

    await Tarea.update(id, tarea);
    router.push("/tareas");
  };

  return (
    <PrivateLayout>
      <main className='container-fluid'>
        <h1 className='text-center my-5'>Tarea: {tarea?.titulo}</h1>
        <div className='row justify-content-center'>
          <div className='col-md-10 col-lg-9 col-xl-8'>
            <h1>Seleccione a los alumnos</h1>

            <DataTable
              className='p-datatable-gridlines'
              value={alumnos}
              className='p-datatable-gridlines shadow-lg'
              rowHover
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              autoLayout
              emptyMessage='No se han encontrado resultados'>
              <Column
                header='#'
                className='text-center'
                style={{ width: "50px" }}
                body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
              />
              <Column header='Estudiante' field='str' filter sortable />
              <Column header='Aula' field='aula' filter sortable />

              <Column
                style={{ width: "100px" }}
                header='Enviar'
                body={(rowData) => {
                  return (
                    <Checkbox
                      onChange={onCheck(rowData)}
                      checked={rowData.enviar}
                    />
                  );
                }}
              />
            </DataTable>
          </div>
        </div>

        <div className='row justify-content-center mt-5'>
          <div className='col-md-4 my-2'>
            <Button
              className='btn-block p-button-outlined p-button-danger'
              label='Regresar'
              onClick={onClickAtras}
            />
          </div>
          <div className='col-md-4 my-2'>
            <Button
              className='btn-block p-button-outlined p-button-success'
              label='Enviar'
              onClick={onClickEnviar}
            />
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

EnviarTareaContainer.getInitialProps = ({ query }) => {
  return { ...query };
};

export default EnviarTareaContainer;

/*

*/
