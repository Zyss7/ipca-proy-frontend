import CustomEditorText from "@components/CustomEditorText";
import CustomPickList from "@components/Inputs/CustomPickList";
import SimpleSelect from "@components/Inputs/SimpleSelect";
import Link from "next/link";
import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

const ENVIO = {
  AULA: "AULA",
  ALUMNOS: "ALUMNOS",
};

const TareasForm = ({ title, almns, setAlumnos }) => {
  const {
    register,
    errors,
    onGuardar,
    onEnviar,
    trigger,
    getValues,
    control,
    watch,
  } = useFormContext();
  const { addToast } = useToasts();

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
              <SimpleSelect
                name="envio"
                label="Enviar por:"
                options={[
                  { label: ENVIO.AULA, value: ENVIO.AULA },
                  { label: ENVIO.ALUMNOS, value: ENVIO.ALUMNOS },
                ]}
                rules={{ required: "Este campo es obligatorio" }}
              />

              {watch("envio") === ENVIO.ALUMNOS && (
                <CustomPickList
                  name="alumnos"
                  source={almns}
                  itemTemplate={(item) => item.alumno}
                  sourceHeader="Alumnos disponibles"
                  targetHeader="Alumnos"
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
                />
              )}
              {watch("envio") === ENVIO.AULA && (
                <CustomPickList
                  name="aulas"
                  source={almns}
                  itemTemplate={(item) => item.alumno}
                  sourceHeader="Aulas disponibles"
                  targetHeader="Aulas"
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
                />
              )}

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
