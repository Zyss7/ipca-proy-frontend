import { dateToFormatDate } from '@utils/utils';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import { Button } from 'react-bootstrap';

const PlaylistTable = ({ data, onClickEliminar }) => {
  return (
    <React.Fragment>
      <div className="datatable-doc-demo">
        <DataTable
          value={data}
          className="p-datatable-gridlines shadow-lg"
          rowHover
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          autoLayout
          emptyMessage="No hay listas de reproduccion registradas"
        >
          <Column
            header="#"
            className="text-center"
            style={{ width: '50px' }}
            body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
          />
          <Column header="Nombre" field="titulo" filter sortable />
          <Column
            header="Fecha de creación"
            field="createdAt"
            filter
            filterField="createdAt"
            sortable
            body={(rowData) => dateToFormatDate(rowData?.createdAt)}
            style={{ width: '250px' }}
          />
          <Column
            header="Opciones"
            bodyStyle={{ padding: '0.5rem 0.5rem 0.5rem 0.5rem' }}
            body={(rowData) => (
              <React.Fragment>
                <React.Fragment>
                  <Link href={`/playlist/form?id=${rowData?.id}`}>
                    <a className="btn btn-primary btn-block btn-sm">Editar</a>
                  </Link>
                  <Button
                    block
                    size="sm"
                    variant="danger"
                    onClick={onClickEliminar(rowData)}
                  >
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
