import { useQuery } from "@apollo/client";
import PrivateLayout from "@layouts/privateLayout";
import { Estudiante } from "@services/Personas.service";
import { Tarea } from "@services/Tareas.service";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { useToasts } from "react-toast-notifications";

const EnviarTareaContainer = ({ id }) => {
  const [tarea, setTarea] = useState({});

  const [estudiantes, setEstudiantes] = useState([]);

  const { addToast } = useToasts();

  const router = useRouter();

  const [cargando, setCargando] = useState(true);

  const { loading } = useQuery(Estudiante.getEstudiantes, {
    onCompleted: async ({ estudiantes: items }) => {
      console.log(items);
      const resTarea = await Tarea.getById(id);
      setTarea(resTarea);
      setCargando(false);
      if (resTarea.estudiantes && resTarea.estudiantes.length > 0) {
        resTarea.estudiantes.forEach((e) => {
          const item = items.find((obj) => obj.id === e.id);
          item.enviar = true;
        });
      }
      setEstudiantes(items.map((e) => ({ ...e })));
    },
  });

  const onCheck = (rowData) => ({ checked }) => {
    const estudiante = estudiantes.find((e) => e.id === rowData.id);
    const index = estudiantes.indexOf(estudiante);
    estudiante.enviar = checked;
    estudiantes[index] = estudiante;
    setEstudiantes([...estudiantes]);
  };

  const onClickAtras = () => {
    router.push(`/tareas/form?id=${id}`);
  };

  const onClickEnviar = async () => {
    const estudiantesTemp = estudiantes.filter((e) => e.enviar === true);

    if (estudiantesTemp.length === 0) {
      return addToast("DEBE SELECCIONAR AL MENOS UN ALUMNO", {
        appearance: "error",
      });
    }

    tarea.estudiantes = estudiantesTemp;
    tarea.estadoEnvio = "E";
    console.log("ESTUDIANTES: ", tarea);
    const response = await Tarea.update(id, tarea);
    console.log(response.data?.estudiantes);
    //router.push("/tareas");
  };

  return (
    <PrivateLayout>
      <main className='container-fluid'>
        <h1 className='text-center my-5'>Tarea: {tarea?.titulo}</h1>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <h1>Seleccione a los alumnos</h1>
            <DataTable
              className='p-datatable-gridlines'
              value={estudiantes}
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
              <Column header='Estudiante' field='persona.str' filter sortable />

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
