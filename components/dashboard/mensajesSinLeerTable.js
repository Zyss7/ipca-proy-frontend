import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const MensajesSinLeerTable = () => {
  const mensajes = [
    {
      id: 1234,
      docente: {
        nombreCompleto: "Este es el docente",
      },
      descripcion: "descripcion",
    },
    {
      id: 1234,
      docente: {
        nombreCompleto: "Este es el docente",
      },
      descripcion: "descripcion1",
    },
  ];

  return (
    <React.Fragment>
      <h3 className="mt-5">Mensajes sin Leer</h3>

      <div className="datatable-doc-demo">
        <DataTable
          value={mensajes}
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
          <Column header="Remitente" field="docente.nombreCompleto" />
          <Column header="Descripción" field="descripcion" />
          <Column
            header="Opciones"
            body={(rowData) => {
              return (
                <button className="btn btn-block btn-info btn-sm">
                  Ver Mensaje
                </button>
              );
            }}
          />
        </DataTable>
      </div>
    </React.Fragment>
  );
};

export default MensajesSinLeerTable;
