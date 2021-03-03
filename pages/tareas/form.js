import CustomDateTimePicker from '@components/Inputs/CustomDateTimePicker';
import PrivateLayout from '@layouts/privateLayout';
import { useSpeak } from 'hooks/useSpeak';
import useTareas from 'hooks/useTareas';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { CustomTextEditor } from '../../components/exports/index';

const FormTareaContainer = ({ id }) => {
  const methods = useForm({ mode: 'onChange' });

  const { register, errors, handleSubmit } = methods;
  const { addToast } = useToasts();

  const { fetchAudio } = useSpeak();
  const audioRef = useRef(null);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const { getTareaById, update, save } = useTareas();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      console.log('EDITAR');
      getTareaById(id).then((res) => {
        methods.reset(res);
      });
    }
  }, []);

  const onGuardar = async (data) => {
    data.estadoEnvio = 'PENDIENTE';
    try {
      if (id) {
        await update(id, data);
      } else {
        const res = await save(data);
        router.replace(`/tareas/form?id=${res.id}`);
      }
      addToast('Se ha guarado correctamente', { appearance: 'info' });
    } catch (error) {
      addToast('Ha ocurrido un problema al momento de guardar la tare', {
        appearance: 'error',
      });
    }
  };

  const mensajeGuardar = () => {
    addToast('Se han guardado todos los cambios', { appearance: 'info' });
  };

  const onEnviar = async (data) => {
    data.estadoEnvio = 'PENDIENTE';
    console.log('DATA: ', data);
    if (id) {
      await update(id, data);
      mensajeGuardar();
      return router.push(`/tareas/enviar?id=${id}`);
    }
    const res = await save(data);
    router.replace(`/tareas/form?id=${res.id}`);
    mensajeGuardar();
    return router.replace(`/tareas/enviar?id=${res.id}`);
  };

  const onSubmitError = () => {
    console.log('ERROR');
  };
  const stopSpeak = () => {
    audioRef?.current?.pause();
  };

  const onClickEscuchar = async () => {
    if (!isSpeaking) {
      const descripcionHablada = methods.getValues('descripcionHablada');
      if (!descripcionHablada) {
        return addToast('NO HA INGRESADO NINGUNA DESCRIPCION!', {
          appearance: 'warning',
        });
      }
      const res = await fetchAudio(descripcionHablada);
      audioRef.current.src = window.URL.createObjectURL(res);
      audioRef.current?.play();
    }
  };

  return (
    <PrivateLayout>
      <FormProvider {...methods}>
        <main className="container-fluid">
          <h1 className="display-4 text-center my-5">Crea y edita una tarea</h1>
          <audio
            className="d-none"
            ref={(ref) => {
              try {
                audioRef.current = ref;
                ref.onplay = () => {
                  setIsSpeaking(true);
                };
                ref.onpause = () => {
                  setIsSpeaking(false);
                };
              } catch (error) {}
            }}
          />
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <form>
                <div className="form-row">
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label>Titulo de la tarea:</Form.Label>
                      <Form.Control
                        name="titulo"
                        isInvalid={!!errors.titulo}
                        ref={register({
                          required: 'Este campo es Obligatorio',
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        <p className="text-danger">{errors?.titulo?.message}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="col-lg-6">
                    <CustomDateTimePicker name="fechaEntrega" label="Fecha de Entrega" />
                  </div>

                  <div className="col-12">
                    <CustomTextEditor
                      label="Descripcion:"
                      name="descripcion"
                      rules={{
                        required: 'Este campo es Obligatorio',
                      }}
                    />
                  </div>

                  <div className="col-lg-12"></div>

                  <div className="col-12">
                    <Form.Group>
                      <Form.Label>
                        Descripción hablada:
                        <Button
                          className="ml-1 rounded font-weight-bold"
                          size="sm"
                          type="button"
                          onClick={onClickEscuchar}
                        >
                          <i className="pi pi-volume-up" />
                        </Button>
                        {isSpeaking && (
                          <Button
                            className="ml-1 rounded font-weight-bold"
                            size="sm"
                            type="button"
                            variant="danger"
                            onClick={stopSpeak}
                          >
                            <i className="pi pi-pause" />
                          </Button>
                        )}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="descripcionHablada"
                        rows={7}
                        isInvalid={!!errors.titulo}
                        ref={register({
                          required: 'Este campo es Obligatorio',
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
                    <Link href="/tareas">
                      <a className="btn btn-block btn-danger">Cancelar</a>
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <Button
                      variant="success"
                      type="button"
                      block
                      onClick={handleSubmit(onGuardar, onSubmitError)}
                    >
                      Guardar
                    </Button>
                  </div>
                  <div className="col-md-3">
                    <Button
                      variant="info"
                      type="submit"
                      block
                      onClick={handleSubmit(onEnviar, onSubmitError)}
                    >
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
