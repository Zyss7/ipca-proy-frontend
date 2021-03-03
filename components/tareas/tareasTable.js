import useCustomRouter from 'hooks/useCustomRouter';
import useTareas from 'hooks/useTareas';
import useUsuario from 'hooks/useUsuario';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalEliminarTarea from './modalEliminar';

const TareasTable = ({ data, cargarTareas }) => {
  const router = useCustomRouter();

  const [showEliminar, setShowEliminar] = useState(false);

  const [tarea, setTarea] = useState({});

  const { changeEstado } = useTareas();

  const { usuario } = useUsuario();

  const [expandedRows, setExpandedRows] = useState([]);

  const rowExpandTemplate = (data) => {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <h1>Tarea: {data.titulo}</h1>
              <button
                className="btn btn-sm btn-primary"
                onClick={router.goTo(`/tareas/detalle?id=${data.id}`)}
              >
                Ver tarea completa
              </button>
            </div>

            <div className="col-12 col-md-8">
              <h4>Alumnos:</h4>
              <table className="table table-sm table-light text-center">
                <thead className="thead-dark">
                  <tr>
                    <th style={{ width: '50px' }}>#</th>
                    <th>Alumno</th>
                    <th style={{ width: '200px' }}>Estado</th>
                    <th style={{ width: '100px' }}>Visto</th>
                    <th style={{ width: '150px' }}>Evidencias</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.alumnos?.map((alumno, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{alumno.str}</td>
                      <td> {alumno.estado}</td>
                      <td>{alumno.show ? 'SI' : 'NO'}</td>
                      <td>
                        {alumno.evidencia && (
                          <Button
                            variant="info"
                            block
                            className="btn-sm"
                            onClick={router.goTo(
                              `/evidencias?tarea=${data?.id}&alumno=${alumno.id}`,
                            )}
                          >
                            Ver evidencia
                          </Button>
                        )}

                        {!alumno.evidencia && <h6>No registra</h6>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const onClickEditar = (rowData) => () => {
    router.push(`/tareas/form?id=${rowData.id}`);
  };

  const toggleEliminar = () => {
    setShowEliminar(!showEliminar);
  };

  const onClickEliminar = (rowData) => () => {
    toggleEliminar();
    setTarea(rowData);
  };

  const onChangeEstado = (rowData) => async ({ target }) => {
    await changeEstado(rowData?.id, rowData, target.value);
  };

  return (
    <React.Fragment>
      <div className="datatable-doc-demo mb-5">
        <DataTable
          value={data}
          className="p-datatable-gridlines shadow-lg p-datatable-sm"
          rowHover
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          autoLayout
          emptyMessage="No se han encontrado resultados"
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          //onRowExpand={this.onRowExpand}
          //onRowCollapse={this.onRowCollapse}
          rowExpansionTemplate={rowExpandTemplate}
          stateKey="DT-TAREAS"
          stateStorage="local"
        >
          {usuario.isDocente && <Column expander style={{ width: '4em' }} />}
          <Column
            header="#"
            className="text-center"
            style={{ width: '50px' }}
            body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
          />

          <Column header="Tarea" field="titulo" filter sortable />

          <Column
            header="Fecha de creacion"
            filter
            sortable
            sortField="createdAt"
            body={(rowData) => {
              return moment(rowData.createdAt).format('LLL');
            }}
          />
          <Column
            header="Fecha de entrega"
            filter
            sortable
            sortField="fechaEntrega"
            body={(rowData) => {
              return moment(rowData.fechaEntrega).format('LLL');
            }}
          />
          {usuario.isDocente && (
            <Column
              header="Estado de envio"
              filter
              sortable
              style={{ width: '175px' }}
              field="estadoEnvio"
            />
          )}

          {usuario.isAlumno && (
            <Column
              header="Estado"
              style={{ width: '150px' }}
              filter
              sortable
              sortField="estado"
              filterField="estado"
              body={(rowData) => (
                <select
                  className="form-control"
                  onChange={onChangeEstado(rowData)}
                  defaultValue={rowData.estado}
                >
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="FINALIZADO">FINALIZADO</option>
                </select>
              )}
            />
          )}

          <Column
            header="Opciones"
            bodyStyle={{ padding: '0.5rem 0.5rem 0.5rem 0.5rem' }}
            body={(rowData) => (
              <React.Fragment>
                <div className="d-flex flex-row justify-content-around">
                  {usuario.isDocente && (
                    <React.Fragment>
                      <Button size="sm" onClick={onClickEditar(rowData)}>
                        <i className="pi pi-pencil mt-1" />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={onClickEliminar(rowData)}
                      >
                        <i className="pi pi-trash mt-1" />
                      </Button>
                    </React.Fragment>
                  )}

                  <button
                    className="btn btn-sm btn-info"
                    onClick={router.goTo(`/tareas/detalle?id=${rowData.id}`)}
                  >
                    <i className="pi pi-info-circle mt-1" />
                  </button>
                </div>
              </React.Fragment>
            )}
          />
        </DataTable>
      </div>

      <ModalEliminarTarea
        toggleEliminar={toggleEliminar}
        showEliminar={showEliminar}
        tarea={tarea}
        cargarTareas={cargarTareas}
      />
    </React.Fragment>
  );
};

export default TareasTable;
