import { Tarea } from "@services/Tareas.service";
import { useUsuario } from "context/UsuarioContext";
import useCustomRouter from "hooks/useCustomRouter";
import { useSpeak } from "hooks/useSpeak";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";

const TareasPendientesTable = () => {
  const [tareas, setTareas] = useState([]);

  const [usuario] = useUsuario();

  const router = useCustomRouter();
  const { speak } = useSpeak();

  const getTareas = async () => {
    const queryParam = { estadoEnvio: Tarea.PENDIENTE };

    if (usuario.isAlumno) {
      queryParam.estadoEnvio = Tarea.ENVIADO;
    }

    const tareas = await Tarea.getAll(queryParam);

    console.log(tareas);

    setTareas(tareas);
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <React.Fragment>
      {usuario.isDocente && <h3>Tareas pendientes de terminar de editar</h3>}
      {usuario.isAlumno && <h3>Tareas pendientes de realizar</h3>}

      <div className='datatable-doc-demo'>
        <DataTable
          value={tareas}
          className='p-datatable-customers shadow-lg p-datatable-gridlines'
          rowHover
          paginator
          currentPageReportTemplate='{totalRecords} registros totales'
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          rows={3}
          rowsPerPageOptions={[3, 5, 10, 25, 50]}
          responsive
          emptyMessage='No se han encontrado resultados'>
          <Column
            header='#'
            className='text-center'
            style={{ width: "50px" }}
            body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
          />

          <Column header='Tarea' field='titulo' />
          {usuario?.isAlumno && (
            <Column header='Docente' field='docente.str' sortable filter />
          )}

          {usuario?.isDocente && (
            <Column
              header='# Alumnos'
              body={(rowData) => {
                return rowData?.alumnos?.length || "PENDIENTE DE REGISTRO";
              }}
            />
          )}

          <Column
            header='Opciones'
            body={(rowData) => (
              <React.Fragment>
                {usuario?.isDocente && (
                  <React.Fragment>
                    <Button
                      icon='pi pi-pencil'
                      className='p-button-sm  p-button-info'
                      onClick={router.goTo(`/tareas/form?id=${rowData.id}`)}
                    />
                  </React.Fragment>
                )}

                {usuario?.isAlumno && (
                  <React.Fragment>
                    <button
                      className='p-button  p-button-info'
                      onClick={router.goTo(`/tareas/detalle?id=${rowData.id}`)}>
                      <i className='pi pi-info-circle' />
                    </button>

                    <button
                      className='p-button p-button-info'
                      onClick={() => {
                        speak(rowData.descripcionHablada);
                      }}>
                      <i className='pi pi-info-circle' />
                    </button>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          />
        </DataTable>
      </div>
    </React.Fragment>
  );
};

export default TareasPendientesTable;
