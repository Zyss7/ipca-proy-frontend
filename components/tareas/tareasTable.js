import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tarea } from "@services/Tareas.service";

const TareasTable = () => {
  const [tareas, setTareas] = useState([]);

  const init = useCallback(async () => {
    setTareas(await Tarea.getAll());
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <React.Fragment>
      <div className="datatable-doc-demo">
        <DataTable
          value={tareas}
          className="p-datatable-customers shadow-lg"
          rowHover
          paginator
          currentPageReportTemplate="{totalRecords} registros totales"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          responsive
          emptyMessage="No se han encontrado resultados"
        >
          <Column
            header="#"
            className="text-center"
            style={{ width: "50px" }}
            body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
          />

          <Column header="Tarea" field="titulo" filter sortable />
          <Column
            header="Docente"
            field="docente.nombreCompleto"
            filter
            sortable
          />
          <Column
            header="Alumno"
            field="alumno.nombreCompleto"
            filter
            sortable
          />
          <Column
            header="Opciones"
            body={(rowData) => {
              return (
                <button className="btn btn-block btn-info btn-sm">
                  Ver tarea
                </button>
              );
            }}
          />
        </DataTable>
      </div>
    </React.Fragment>
  );
};

export default TareasTable;
