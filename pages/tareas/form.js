import CustomDateTimePicker from "@components/Inputs/CustomDateTimePicker";
import PrivateLayout from "@layouts/privateLayout";
import { Tarea } from "@services/Tareas.service";
import { useSpeak } from "hooks/useSpeak";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { CustomTextEditor } from "../../components/exports/index";

const FormTareaContainer = ({ id }) => {
  const methods = useForm({ mode: "onChange" });

  const { register, errors, handleSubmit } = methods;
  const { addToast } = useToasts();

  const { speak, isSpeaking, stopSpeak } = useSpeak();

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
    data.estadoEnvio = "PENDIENTE";

    if (id) {
      await Tarea.update(id, data);
    } else {
      const res = await Tarea.save(data);
      router.replace(`/tareas/form?id=${res.id}`);
    }
  };

  const onEnviar = async (data) => {
    if (id) {
      await Tarea.update(id, data);
      return router.push(`/tareas/enviar?id=${id}`);
    }
    const res = await Tarea.save(data);
    router.replace(`/tareas/form?id=${res.id}`);
    return router.replace(`/tareas/enviar?id=${res.id}`);
  };

  const onSubmitError = () => {
    console.log("ERROR");
  };

  const onClickEscuchar = () => {
    const descripcionHablada = methods.getValues("descripcionHablada");
    if (!descripcionHablada) {
      return addToast("NO HA INGRESADO NINGUNA DESCRIPCION!", {
        appearance: "warning",
      });
    }
    speak(descripcionHablada);
  };

  return (
    <PrivateLayout>
      <FormProvider {...methods}>
        <main className='container-fluid'>
          <h1 className='display-4 text-center my-5'>Crea y edita una tarea</h1>

          <div className='row justify-content-center'>
            <div className='col-lg-10'>
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

                  <div className='col-12'>
                    <CustomTextEditor
                      label='Descripcion:'
                      name='descripcion'
                      rules={{
                        required: "Este campo es Obligatorio",
                      }}
                    />
                  </div>

                  <div className='col-lg-12'></div>

                  <div className='col-12'>
                    <Form.Group>
                      <Form.Label>
                        Descripción hablada:
                        <Button
                          className='ml-1 rounded font-weight-bold'
                          size='sm'
                          type='button'
                          onClick={onClickEscuchar}>
                          <i className='pi pi-volume-up' />
                        </Button>
                        {isSpeaking && (
                          <Button
                            className='ml-1 rounded font-weight-bold'
                            size='sm'
                            type='button'
                            variant='danger'
                            onClick={stopSpeak}>
                            <i className='pi pi-pause' />
                          </Button>
                        )}
                      </Form.Label>
                      <Form.Control
                        as='textarea'
                        name='descripcionHablada'
                        rows={7}
                        isInvalid={!!errors.titulo}
                        ref={register({
                          required: "Este campo es Obligatorio",
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        <p className='text-danger'>
                          {errors?.descripcionHablada?.message}
                        </p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>

                <Row className='justify-content-around mb-5'>
                  <div className='col-md-3'>
                    <Link href='/tareas'>
                      <a className='btn btn-block btn-danger'>Cancelar</a>
                    </Link>
                  </div>
                  <div className='col-md-3'>
                    <Button
                      variant='success'
                      type='button'
                      block
                      onClick={handleSubmit(onGuardar, onSubmitError)}>
                      Guardar
                    </Button>
                  </div>
                  <div className='col-md-3'>
                    <Button
                      variant='info'
                      type='submit'
                      block
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
