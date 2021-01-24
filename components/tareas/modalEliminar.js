import useTareas from "hooks/useTareas";
import { Button as ButtonPrime } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

/**
 *
 * @param {{showEliminar:boolean,toggleEliminar:CallableFunction,tarea:object,cargarTareas:CallableFunction}} param0
 */
const ModalEliminarTarea = ({
  showEliminar,
  toggleEliminar,
  tarea,
  cargarTareas,
}) => {
  const methods = useForm({ mode: "onChange" });
  const { deleteTarea } = useTareas();
  const [isEliminando, setEliminando] = useState(false);

  const { errors, handleSubmit } = methods;

  const onClickConfirmEliminar = async () => {
    setEliminando(true);
    await deleteTarea(tarea.id);
    await cargarTareas();
    setEliminando(false);
  };
  console.log(errors);
  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={showEliminar}
      onHide={toggleEliminar}
      backdrop={isEliminando ? "static" : true}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Confirmacion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Esta seguro de eliminar esta tarea?</h5>
        {`${tarea?.titulo} Esta tarea fue enviada a los siguientes alumnos:`}

        <ol>
          {tarea?.estudiantes?.map((e, index) => (
            <li key={index}>{e?.persona?.str}</li>
          ))}
        </ol>
        <div className='p-grid p-fluid'>
          <div className='p-col-12 p-md-8'>
            <div className='p-inputgroup'>
              <Controller
                control={methods.control}
                name='confirmacion'
                defaultValue=''
                rules={{
                  required: "Este campo es obligatorio",
                  validate: (value) => {
                    if (value !== "confirmar") {
                      return "Si desea eliminar escriba: confirmar";
                    }
                    return true;
                  },
                }}
                render={({ onChange, value }) => (
                  <InputText
                    placeholder='Escriba "confirmar" para eliminar la tarea'
                    value={value}
                    onChange={({ currentTarget }) =>
                      onChange(currentTarget.value)
                    }
                    disabled={isEliminando}
                  />
                )}
              />
              <ButtonPrime
                label={isEliminando ? "Eliminando..." : "Confirmar"}
                className='p-button-danger'
                onClick={handleSubmit(onClickConfirmEliminar)}
                disabled={isEliminando}
              />
            </div>
            {errors?.confirmacion && (
              <small className='p-invalid'>
                {errors?.confirmacion?.message}
              </small>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={toggleEliminar}
          size='sm'
          variant='outline-danger'
          disabled={isEliminando}>
          {isEliminando && "Eliminando..."}
          {!isEliminando && "Cerrar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarTarea;
