import CustomEditorText from "@components/CustomEditorText";
import React, { useState, useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import Link from "next/link";
import { PickList } from "primereact/picklist";
import _ from "lodash";

const TareasForm = ({ title, almns = [] }) => {
  const {
    register,
    errors,
    onGuardar,
    onEnviar,
    trigger,
    getValues,
    control,
  } = useFormContext();
  const { addToast } = useToasts();

  const [alumnos, setAlumnos] = useState(almns);

  const validarForm = (callback) => async (event) => {
    event.preventDefault();

    const isValid = await trigger();
    if (!isValid) {
      addToast("RELLENE CORRECTAMENTE EL FORMULARIO", {
        appearance: "error",
      });
      return;
    }
    callback(getValues());
  };

  return (
    <React.Fragment>
      <main className="container-fluid">
        <h1 className="display-4 text-center">{title}</h1>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form>
              <Form.Group>
                <Form.Label>Alumnos:</Form.Label>
                <Controller
                  name="alumnos"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    validate: (value) => {
                      if (value.length === 0) {
                        addToast("DEBE SELECCIONAR AL MENOS UN ALUMNO", {
                          appearance: "error",
                        });
                        return "Este campo es obligatorio";
                      }
                      return true;
                    },
                  }}
                  render={({ onChange, value }) => (
                    <PickList
                      source={alumnos}
                      target={value || []}
                      itemTemplate={(item) => item.alumno}
                      sourceHeader="Remitentes disponibles"
                      targetHeader="Remitentes"
                      showSourceControls={false}
                      showTargetControls={false}
                      responsive={true}
                      onChange={(evt) => {
                        setAlumnos(evt.source);
                        onChange(evt.target);
                      }}
                    />
                  )}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Titulo de la tarea:</Form.Label>
                <Form.Control
                  name="titulo"
                  size="sm"
                  isInvalid={!!errors.titulo}
                  ref={register({ required: "Este campo es Obligatorio" })}
                />
                <Form.Control.Feedback type="invalid">
                  <p className="text-danger">{errors?.titulo?.message}</p>
                </Form.Control.Feedback>
              </Form.Group>
              <CustomEditorText
                label="Descripcion:"
                name="descripcion"
                rules={{
                  required: "Este campo es Obligatorio",
                }}
              />
              <Row className="justify-content-around">
                <div className="col-md-3">
                  <Link href="/tareas">
                    <a className="btn btn-sm btn-block btn-danger">Cancelar</a>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Button
                    variant="success"
                    type="submit"
                    block
                    size="sm"
                    onClick={validarForm(onGuardar)}
                  >
                    Guardar
                  </Button>
                </div>
                <div className="col-md-3">
                  <Button
                    variant="info"
                    type="submit"
                    block
                    size="sm"
                    onClick={validarForm(onEnviar)}
                  >
                    Enviar
                  </Button>
                </div>
              </Row>
            </form>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default TareasForm;
