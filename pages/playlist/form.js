import PrivateLayout from "@layouts/privateLayout";
import Link from "next/link";
import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const FormPlaylistContainer = () => {
  const methods = useForm({ mode: "onChange" });
  const { register, errors, handleSubmit } = methods;
  return (
    <PrivateLayout>
      <main className="container-fluid">
        <FormProvider {...methods}>
          <h1 className="display-4 text-center my-5">
            Crea y edita una playlist
          </h1>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <form>
                <div className="form-row">
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label>Titulo de la playlist:</Form.Label>
                      <Form.Control
                        name="titulo"
                        isInvalid={!!errors.titulo}
                        ref={register({
                          required: "Este campo es Obligatorio",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        <p className="text-danger">{errors?.titulo?.message}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group>
                      <Form.Label>Descripción:</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="descripcion"
                        rows={7}
                        isInvalid={!!errors.titulo}
                        ref={register({
                          required: "Este campo es Obligatorio",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        <p className="text-danger">
                          {errors?.descripcionHablada?.message}
                        </p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <Row className="justify-content-around mb-5">
                  <div className="col-md-3">
                    <Link href="/playlist">
                      <a className="btn btn-block btn-danger">Cancelar</a>
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <Button variant="success" type="button" block>
                      Guardar
                    </Button>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </FormProvider>
      </main>
    </PrivateLayout>
  );
};
FormPlaylistContainer.getInitialProps = ({ query }) => {
  return { ...query };
};
export default FormPlaylistContainer;
