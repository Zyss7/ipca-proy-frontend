import CustomEditorText from "@components/CustomEditorText";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { PickList } from "primereact/picklist";

const MensajesForm = ({ title }) => {
  const {
    register,
    errors,
    onEnviar,
    trigger,
    getValues,
    control,
  } = useFormContext();

  const [remitentes, setRemitentes] = useState([
    { id: 54464, remitentes: "Sebastián Villa| M5A" },
  ]);

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
              <Form.Group>
                <Form.Label>Remitentes:</Form.Label>
                <Controller
                  name="remitentes"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    validate: (value) => {
                      if (value.length === 0) {
                        addToast("DEBE SELECCIONAR AL MENOS UN REMITENTE", {
                          appearance: "error",
                        });
                        return "Este campo es obligatorio";
                      }
                      return true;
                    },
                  }}
                  render={({ onChange, value }) => (
                    <PickList
                      source={remitentes}
                      target={value || []}
                      itemTemplate={(item) => item.remitentes}
                      sourceHeader="Remitentes disponibles"
                      targetHeader="Remitentes"
                      showSourceControls={false}
                      showTargetControls={false}
                      responsive={true}
                      onChange={(evt) => {
                        setRemitentes(evt.source);
                        onChange(evt.target);
                      }}
                    />
                  )}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Asunto:</Form.Label>
                <Form.Control
                  name="asunto"
                  size="sm"
                  isInvalid={!!errors.asunto}
                  ref={register({ required: "Este campo es Obligatorio" })}
                />
                <Form.Control.Feedback type="invalid">
                  <p className="text-danger">{errors?.asunto?.message}</p>
                </Form.Control.Feedback>
              </Form.Group>
              <CustomEditorText
                label="Mensaje:"
                name="mensaje"
                rules={{
                  required: "Este campo es Obligatorio",
                }}
              />
              <Row className="justify-content-center">
                <div className="col-md-3">
                  <Link href="/tareas">
                    <a className="btn btn-sm btn-block btn-danger">Cancelar</a>
                  </Link>
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

export default MensajesForm;
