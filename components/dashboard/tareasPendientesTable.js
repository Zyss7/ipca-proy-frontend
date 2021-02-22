import { Tarea } from '@services/Tareas.service';
import useCustomRouter from 'hooks/useCustomRouter';
import useTareas from 'hooks/useTareas';
import useUsuario from 'hooks/useUsuario';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

const TareasPendientesTable = () => {
  const [tareas, setTareas] = useState([]);

  const { getTareas } = useTareas();

  const { usuario } = useUsuario();

  const router = useCustomRouter();

  const init = async () => {
    const queryParam = { estadoEnvio: Tarea.PENDIENTE };
    if (usuario?.isAlumno) {
      queryParam.estadoEnvio = Tarea.ENVIADO;
    }
    const tareas = await getTareas(queryParam);
    setTareas(tareas);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <React.Fragment>
      {usuario?.isDocente && <h3>Tareas pendientes de terminar de editar</h3>}
      {usuario?.isAlumno && <h3>Tareas pendientes de realizar</h3>}

      <div className="datatable-doc-demo">
        <DataTable
          value={tareas}
          className="p-datatable-sm shadow-lg p-datatable-gridlines"
          rowHover
          paginator
          currentPageReportTemplate="{totalRecords} registros totales"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rows={3}
          rowsPerPageOptions={[3, 5, 10, 25, 50]}
          responsive
          emptyMessage="No se han encontrado resultados"
        >
          <Column
            header="#"
            className="text-center"
            style={{ width: '50px' }}
            body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
          />

          <Column header="Tarea" field="titulo" />
          {usuario?.isAlumno && (
            <Column header="Docente" field="docente.str" sortable filter />
          )}

          <Column
            style={{ width: '150px' }}
            bodyClassName="text-center"
            headerClassName="text-center"
            header="Opciones"
            body={(rowData) => (
              <React.Fragment>
                {usuario?.isDocente && (
                  <React.Fragment>
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-sm  p-button-info"
                      onClick={router.goTo(`/tareas/form?id=${rowData.id}`)}
                    />
                  </React.Fragment>
                )}

                {usuario?.isAlumno && (
                  <React.Fragment>
                    <Button
                      icon="pi pi-info-circle"
                      onClick={router.goTo(`/tareas/detalle?id=${rowData.id}`)}
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
