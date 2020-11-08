import { useUsuario } from "context/UsuarioContext";
import useCustomRouter from "hooks/useCustomRouter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalEliminarTarea from "./modalEliminar";
import moment from "moment";

const TareasTable = ({ data, cargarTareas }) => {
  const router = useCustomRouter();
  const [modalShow, setModalShow] = useState(false);

  const [showEliminar, setShowEliminar] = useState(false);

  const [tarea, setTarea] = useState({});

  const [usuario] = useUsuario();

  const [expandedRows, setExpandedRows] = useState([]);

  const rowExpandTemplate = (data) => {
    return (
      <React.Fragment>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1>Tarea: {data.titulo}</h1>
              <button
                className='btn btn-sm btn-primary'
                onClick={router.goTo(`/tareas/detalle?id=${data.id}`)}>
                Ver tarea completa
              </button>
            </div>

            <div className='col-12'>
              <h4>Alumnos:</h4>
              <ol>
                {data?.alumnos?.map((alumno, index) => (
                  <li key={index}>{alumno.str}</li>
                ))}
              </ol>
              <h4>Estado: {data.estadoEnvio}</h4>
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

  return (
    <React.Fragment>
      <div className='datatable-doc-demo mb-5'>
        <DataTable
          value={data}
          className='p-datatable-gridlines shadow-lg'
          rowHover
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          autoLayout
          emptyMessage='No se han encontrado resultados'
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          //onRowExpand={this.onRowExpand}
          //onRowCollapse={this.onRowCollapse}
          rowExpansionTemplate={rowExpandTemplate}>
          <Column expander style={{ width: "4em" }} />
          <Column
            header='#'
            className='text-center'
            style={{ width: "50px" }}
            body={(rowData, row) => <strong>{row.rowIndex + 1}</strong>}
          />

          <Column header='Tarea' field='titulo' filter sortable />

          <Column
            header='Fecha de creacion'
            filter
            sortable
            sortField='createdAt'
            body={(rowData) => {
              return moment(rowData.createdAt).format("LLL");
            }}
          />
          <Column
            header='Fecha de entrega'
            filter
            sortable
            sortField='fechaEntrega'
            body={(rowData) => {
              return moment(rowData.fechaEntrega).format("LLL");
            }}
          />
          <Column
            header='Estado de envio'
            filter
            sortable
            style={{ width: "175px" }}
            field='estadoEnvio'
          />

          <Column
            header='Opciones'
            bodyStyle={{ padding: "0.5rem 0.5rem 0.5rem 0.5rem" }}
            body={(rowData) => (
              <React.Fragment>
                <div className='d-flex flex-row justify-content-around'>
                  {usuario.isDocente && (
                    <React.Fragment>
                      <Button size='sm' onClick={onClickEditar(rowData)}>
                        <i className='pi pi-pencil mt-1' />
                      </Button>
                      <Button
                        size='sm'
                        variant='danger'
                        onClick={onClickEliminar(rowData)}>
                        <i className='pi pi-trash mt-1' />
                      </Button>
                    </React.Fragment>
                  )}

                  <button
                    className='btn btn-sm btn-info'
                    onClick={router.goTo(`/tareas/detalle?id=${rowData.id}`)}>
                    <i className='pi pi-info-circle mt-1' />
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
