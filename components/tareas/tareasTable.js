import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalEliminarTarea from "./modalEliminar";

const TareasTable = ({ data, cargarTareas }) => {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);

  const [showEliminar, setShowEliminar] = useState(false);

  const [tarea, setTarea] = useState({});

  const onClickEditar = (rowData) => () => {
    router.push(`/tareas/form?id=${rowData.id}`);
  };

  const toggle = () => {
    setModalShow(!modalShow);
  };

  const toggleEliminar = () => {
    setShowEliminar(!showEliminar);
  };

  const onClickVerEstudiantes = (rowData) => (e) => {
    toggle();
    setTarea(rowData);
  };

  const onClickEliminar = (rowData) => () => {
    toggleEliminar();
    setTarea(rowData);
  };

  return (
    <React.Fragment>
      <div className='datatable-doc-demo'>
        <DataTable
          value={data}
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

          <Column header='Tarea' field='titulo' filter sortable />
          <Column
            header='Fecha de entrega'
            field='fechaEntrega'
            filter
            sortable
          />
          <Column
            header='Estado de envio'
            filter
            sortable
            style={{ width: "175px" }}
            body={(rowData) => (
              <React.Fragment>
                {rowData.estadoEnvio === "G" && "PENDIENTE DE ENVIAR"}
                {rowData.estadoEnvio === "E" && "ENVIADA"}
                {/* TODO: VOLVER A ACTIVAR LA TAREA rowData.estadoEnvio === "A" && "ANULADA" */}
              </React.Fragment>
            )}
          />

          <Column
            header='Opciones'
            bodyStyle={{ padding: "0.5rem 0.5rem 0.5rem 0.5rem" }}
            body={(rowData) => (
              <React.Fragment>
                <Button block size='sm' onClick={onClickEditar(rowData)}>
                  Editar
                </Button>
                <Button
                  block
                  size='sm'
                  variant='danger'
                  onClick={onClickEliminar(rowData)}>
                  Eliminar
                </Button>
                <Button
                  block
                  size='sm'
                  onClick={onClickVerEstudiantes(rowData)}>
                  Ver Estudiantes
                </Button>

                <Button block size='sm' onClick={onClickEditar(rowData)}>
                  Comentarios
                </Button>
              </React.Fragment>
            )}
          />
        </DataTable>
      </div>

      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={modalShow}
        onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {tarea?.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Alumnos a los que se envio esta tarea</h5>
          <ol>
            {tarea?.estudiantes?.map((e, index) => (
              <li key={index}>{e?.persona?.str}</li>
            ))}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggle} size='sm' variant='outline-danger'>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

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
