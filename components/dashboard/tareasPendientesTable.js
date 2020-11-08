import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tarea } from "@services/Tareas.service";
import { useUsuario } from "context/UsuarioContext";
import { Button } from "primereact/button";
import useCustomRouter from "hooks/useCustomRouter";

const TareasPendientesTable = () => {
  const [tareas, setTareas] = useState([]);

  const [usuario] = useUsuario();

  const router = useCustomRouter();

  const getTareas = async () => {
    const tareas = await Tarea.getAll({ estadoEnvio: Tarea.PENDIENTE });

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
          {usuario?.isAlumno && <Column header='Docente' field='docente.str' />}

          <Column
            header='# Alumnos'
            body={(rowData) => {
              return rowData?.alumnos?.length || "PENDIENTE DE REGISTRO";
            }}
          />

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
              </React.Fragment>
            )}
          />
        </DataTable>
      </div>
    </React.Fragment>
  );
};

export default TareasPendientesTable;
