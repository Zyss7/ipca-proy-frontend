import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { Button } from "react-bootstrap";

const PlaylistTable = () => {
  return (
    <React.Fragment>
      <div className="datatable-doc-demo">
        <DataTable
          value={[{ value: {} }]}
          className="p-datatable-gridlines shadow-lg"
          rowHover
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          autoLayout
          emptyMessage="No se han encontrado resultados"
        >
          <Column
            header="#"
            className="text-center"
            style={{ width: "50px" }}
            body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
          />
          <Column header="Nombre" filter sortable />
          <Column header="Descripcion" filter sortable />
          <Column header="Fecha de creación" filter sortable />
          <Column
            header="Opciones"
            bodyStyle={{ padding: "0.5rem 0.5rem 0.5rem 0.5rem" }}
            body={() => (
              <React.Fragment>
                <React.Fragment>
                  <Button block size="sm">
                    Editar
                  </Button>
                  <Button block size="sm" variant="danger">
                    Eliminar
                  </Button>
                </React.Fragment>
              </React.Fragment>
            )}
          />
        </DataTable>
      </div>
    </React.Fragment>
  );
};

export default PlaylistTable;
