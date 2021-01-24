import CustomErrorMessage from "@components/ErrorMessage";
import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import { DevTool } from "@hookform/devtools";
import PrivateLayout from "@layouts/privateLayout";
import { youtubeVideoRegex } from "@utils/validaciones";
import classnames from "classnames";
import useCustomRouter from "hooks/useCustomRouter";
import usePlayList from "hooks/usePlayList";
import useQueryString from "hooks/useQueryString";
import _ from "lodash";
import Link from "next/link";
import { Button as PrimeButton } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import uuid from "uuid";

const mappVideos = (videos = []) => {
  return _.orderBy(videos, ["orden"]);
};

const FormPlaylistContainer = ({ id }) => {
  const methods = useForm({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(true);
  const { register, errors, handleSubmit, reset } = methods;

  const { crear, getById, editarById } = usePlayList();
  const router = useCustomRouter();

  useEffect(() => {
    if (id) {
      return getById(id).then((res) => {
        reset(res?.data);
        setLoading(false);
      });
    }
    setLoading(false);
  }, []);

  const onReorder = (setter) => ({ value }) => {
    setter(
      value.map((video, index) => {
        video.orden = index;
        return video;
      })
    );
  };

  const header = (value, setter) => (
    <React.Fragment>
      <div className='d-flex flex-row'>
        <FormVideo videos={value} setVideos={setter} isAdd />
      </div>
    </React.Fragment>
  );

  const onSubmit = async (data) => {
    setLoading(true);
    if (!id) {
      await crear(data);
    } else {
      await editarById(id, data);
    }
    setLoading(false);
    return router.push("/playlist");
  };

  return (
    <PrivateLayout>
      <LoadingWrapper loading={loading}>
        <main className='container-fluid'>
          <DevTool control={methods.control} />
          <FormProvider {...methods}>
            <h1 className='display-4 text-center my-5'>
              Crea y edita una playlist
            </h1>
            <div className='row justify-content-center'>
              <div className='col-lg-10'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='form-row'>
                    <div className='col-lg-6'>
                      <Form.Group>
                        <Form.Label>Titulo de la playlist:</Form.Label>
                        <Form.Control
                          name='titulo'
                          isInvalid={!!errors.titulo}
                          ref={register({
                            required: "Este campo es Obligatorio",
                          })}
                        />

                        <CustomErrorMessage name='titulo' />
                      </Form.Group>
                    </div>
                    <div className='col-12'>
                      <Form.Group>
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control
                          as='textarea'
                          name='descripcion'
                          rows={7}
                          isInvalid={!!errors?.descripcion}
                          ref={register({
                            required: "Este campo es Obligatorio",
                          })}
                        />

                        <CustomErrorMessage name='descripcion' />
                      </Form.Group>
                    </div>
                  </div>

                  <div className='form-group'>
                    <CustomErrorMessage name='videos' />
                    <Controller
                      name='videos'
                      defaultValue={[]}
                      control={methods.control}
                      rules={{
                        validate: (value) => {
                          if (value.length === 0) {
                            return "Debe ingresar mínimo un video";
                          }

                          return true;
                        },
                      }}
                      render={({ value, onChange }, { invalid }) => (
                        <DataTable
                          className={classnames({
                            "p-datatable-gridlines p-datatable-sm border": true,
                            "border-secondary": !invalid,
                            "border-danger": invalid,
                          })}
                          value={value}
                          header={header(value, onChange)}
                          reorderableColumns
                          onRowReorder={onReorder(onChange)}
                          emptyMessage={
                            <div className='text-center my-3'>
                              <strong>No hay videos Agregados</strong>
                              <br />
                              <strong>
                                Pulse en el boton Agregar para añadir un nuevo
                                video a la lista
                              </strong>
                            </div>
                          }
                          autoLayout>
                          <Column
                            rowReorder
                            style={{ width: "3em", textAlign: "center" }}
                          />
                          <Column field='titulo' header='Titulo' />
                          <Column field='descripcion' header='Descripcion' />
                          <Column
                            style={{ width: "70px" }}
                            header='Video'
                            headerClassName='text-center'
                            bodyClassName='text-center'
                            body={(data) => <ModalVideo video={data} />}
                          />
                          <Column
                            style={{ width: "70px" }}
                            header='Editar'
                            headerClassName='text-center'
                            bodyClassName='text-center'
                            body={(data) => (
                              <FormVideo
                                labelBtn=''
                                icon='pi pi-pencil'
                                className='p-button-info'
                                formData={data}
                                isEdit
                                videos={value}
                                setVideos={onChange}
                              />
                            )}
                          />
                          <Column
                            style={{ width: "70px" }}
                            headerClassName='text-center'
                            bodyClassName='text-center'
                            header='Eliminar'
                            body={(data) => (
                              <FormVideo
                                labelBtn=''
                                icon='pi pi-trash'
                                className='p-button-danger'
                                formData={data}
                                isDelete
                                videos={value}
                                setVideos={onChange}
                              />
                            )}
                          />
                        </DataTable>
                      )}
                    />
                  </div>

                  <Row className='justify-content-around mb-5'>
                    <div className='col-md-3'>
                      <Link href='/playlist'>
                        <a className='btn btn-block btn-danger'>Cancelar</a>
                      </Link>
                    </div>
                    <div className='col-md-3'>
                      <Button variant='success' type='submit' block>
                        Guardar
                      </Button>
                    </div>
                  </Row>
                </form>
              </div>
            </div>
          </FormProvider>
        </main>
      </LoadingWrapper>
    </PrivateLayout>
  );
};

FormPlaylistContainer.getInitialProps = ({ query }) => {
  return { ...query };
};
export default FormPlaylistContainer;

const FormVideo = ({
  labelBtn = "Agregar",
  icon = "pi pi-plus",
  className = "",
  formData = {},
  isAdd = false,
  isEdit = false,
  isDelete = false,
  videos = [],
  setVideos,
}) => {
  const methods = useForm({ mode: "onChange" });
  const [show, setShow] = useState(false);
  const { register, errors, handleSubmit, reset } = methods;
  const { getParam } = useQueryString();

  useEffect(() => {
    if (formData) {
      methods.reset(formData);
    }
  }, [videos]);

  const onClick = () => {
    setShow(!show);
  };

  const onSubmit = (data) => {
    if (isEdit || isDelete) {
      videos = videos.filter((video) => video.id !== formData.id);
    } else if (isAdd) {
      data.id = uuid.v4();
      data.orden = videos.length;
    }
    const v = getParam("v", data?.url);
    if (!isDelete) {
      videos.push({
        ...formData,
        ...data,
        v,
        iframeUrl: `https://www.youtube.com/embed/${v}`,
      });
    }

    setVideos(mappVideos(videos));
    reset();
    onClick();
  };

  return (
    <React.Fragment>
      <PrimeButton
        label={labelBtn}
        className={`p-button-sm rounded-0 ${className}`}
        icon={icon}
        type='button'
        onClick={onClick}
      />

      <FormProvider {...methods}>
        <Modal
          show={show}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          onHide={onClick}
          centered>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              {isAdd && "Agregar video"}
              {isEdit && "Editar video"}
              {isDelete && "Esta seguro de eliminar este video?"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className='form-row'>
                <div className='col-lg-12'>
                  <Form.Group>
                    <Form.Label>Titulo del video:</Form.Label>
                    <Form.Control
                      name='titulo'
                      isInvalid={!!errors.titulo}
                      ref={register({
                        required: "Este campo es Obligatorio",
                      })}
                      disabled={isDelete}
                    />
                    <Form.Control.Feedback type='invalid'>
                      <p className='text-danger'>{errors?.titulo?.message}</p>
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className='col-lg-12'>
                  <Form.Group>
                    <Form.Label>URL del video:</Form.Label>
                    <Form.Control
                      name='url'
                      isInvalid={!!errors.url}
                      ref={register({
                        required: "Este campo es Obligatorio",
                        pattern: {
                          value: youtubeVideoRegex,
                          message: "Ingrese una url de youtube valida",
                        },
                      })}
                      disabled={isDelete}
                    />
                    <Form.Control.Feedback type='invalid'>
                      <p className='text-danger'>{errors?.url?.message}</p>
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className='col-12'>
                  <Form.Group>
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control
                      as='textarea'
                      name='descripcion'
                      rows={4}
                      ref={register}
                      disabled={isDelete}
                    />
                    <Form.Control.Feedback type='invalid'>
                      <p className='text-danger'>
                        {errors?.descripcionHablada?.message}
                      </p>
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClick} type='button'>
              Cerrar
            </Button>

            {isDelete && (
              <Button
                type='button'
                variant='danger'
                onClick={() => onSubmit(formData)}>
                Eliminar
              </Button>
            )}
            {!isDelete && (
              <Button
                type='submit'
                variant='success'
                onClick={handleSubmit(onSubmit)}>
                Guardar
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </FormProvider>
    </React.Fragment>
  );
};

const ModalVideo = ({ video }) => {
  const [show, setShow] = useState(false);

  const onHide = () => setShow(!show);

  return (
    <React.Fragment>
      <PrimeButton
        icon='pi pi-video'
        className='p-button-sm rounded-0 p-button-warning '
        type='button'
        onClick={onHide}
      />
      <Modal
        show={show}
        size='xl'
        aria-labelledby='contained-modal-title-vcenter'
        onHide={onHide}
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {video?.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width='560'
            height='450'
            className='w-100'
            src={video?.iframeUrl}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
