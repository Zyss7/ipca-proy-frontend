import { CustomTextEditor } from "../../components/exports/index";
import CustomDateTimePicker from "@components/Inputs/CustomDateTimePicker";
import PrivateLayout from "@layouts/privateLayout";
import { Tarea } from "@services/Tareas.service";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import dynamic from "next/dynamic";

const TestEditor = dynamic(() => import("../"), {
  ssr: false,
});

const FormTareaContainer = ({ id }) => {
  const methods = useForm({ mode: "onChange" });
  const { register, errors, handleSubmit } = methods;

  const router = useRouter();

  useEffect(() => {
    if (id) {
      console.log("EDITAR");
      Tarea.getById(id).then((res) => {
        methods.reset(res);
      });
    }
  }, []);

  const onGuardar = async (data) => {
    console.log(data);

    if (!data.estadoEnvio) {
      data.estadoEnvio = "G";
    }

    if (id) {
      console.log("EXISTE");
      await Tarea.update(id, data);
    } else {
      const res = await Tarea.save(data);
      router.replace(`/tareas/form?id=${res.id}`);
    }
  };

  const onEnviar = async (data) => {
    console.log(data);
    await Tarea.update(id, data);
    router.push(`/tareas/enviar?id=${id}`);
  };

  const onSubmitError = () => {
    console.log("ERROR");
  };

  return (
    <PrivateLayout>
      <FormProvider {...methods}>
        <main className='container-fluid'>
          <h1 className='display-4 text-center my-5'>Crea y edita una tarea</h1>

          <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-10'>
              <form>
                <div className='form-row'>
                  <div className='col-lg-6'>
                    <Form.Group>
                      <Form.Label>Titulo de la tarea:</Form.Label>
                      <Form.Control
                        name='titulo'
                        isInvalid={!!errors.titulo}
                        ref={register({
                          required: "Este campo es Obligatorio",
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        <p className='text-danger'>{errors?.titulo?.message}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className='col-lg-6'>
                    <CustomDateTimePicker
                      name='fechaEntrega'
                      label='Fecha de Entrega'
                    />
                  </div>
                </div>

                <CustomTextEditor
                  label='Descripcion:'
                  name='descripcion'
                  rules={{
                    required: "Este campo es Obligatorio",
                  }}
                />
                <Row className='justify-content-around mb-5'>
                  <div className='col-md-3'>
                    <Link href='/tareas'>
                      <a className='btn btn-sm btn-block btn-danger'>
                        Cancelar
                      </a>
                    </Link>
                  </div>
                  <div className='col-md-3'>
                    <Button
                      variant='success'
                      type='button'
                      block
                      size='sm'
                      onClick={handleSubmit(onGuardar, onSubmitError)}>
                      Guardar
                    </Button>
                  </div>
                  <div className='col-md-3'>
                    <Button
                      variant='info'
                      type='submit'
                      block
                      size='sm'
                      onClick={handleSubmit(onEnviar, onSubmitError)}>
                      Enviar
                    </Button>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </main>
      </FormProvider>
    </PrivateLayout>
  );
};

FormTareaContainer.getInitialProps = ({ query }) => {
  return { ...query };
};

export default FormTareaContainer;
