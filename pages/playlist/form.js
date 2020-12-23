import PrivateLayout from "@layouts/privateLayout";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Button as PrimeButton } from "primereact/button";
import uuid from "uuid";
import _ from "lodash";
import { youtubeVideoRegex } from "@utils/validaciones";
import YouTube from "react-youtube";

const testData = [
  {
    id: uuid.v4(),
    orden: 1,
    titulo: "Prueba",
    url: "https://www.youtube.com/watch?v=V6tP9GyQR5M",
    descripcion: "asdfljasdfjk",
  },
  {
    id: uuid.v4(),
    orden: 2,
    titulo: "Prueba2",
    url: "https://www.youtube.com/watch?v=V6tP9GyQR5M",
    descripcion: "asdfljasdfjk",
  },
  {
    id: uuid.v4(),
    orden: 3,
    titulo: "Prueba3",
    url: "kqJHjpb59OI",
    descripcion: "asdfljasdfjk",
  },
];

const mappVideos = (videos = []) => {
  return _.orderBy(videos, ["orden"]);
};
const FormPlaylistContainer = () => {
  const methods = useForm({ mode: "onChange" });
  const { register, errors, handleSubmit } = methods;

  const [videos, setVideos] = useState(testData);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  const onReorder = ({ value }) => {
    setVideos(
      value.map((video, index) => {
        video.orden = index;
        return video;
      })
    );
  };

  const header = (
    <React.Fragment>
      <div className='d-flex flex-row'>
        <FormVideo videos={videos} setVideos={setVideos} isAdd />
      </div>
    </React.Fragment>
  );

  return (
    <PrivateLayout>
      <main className='container-fluid'>
        <FormProvider {...methods}>
          <h1 className='display-4 text-center my-5'>
            Crea y edita una playlist
          </h1>
          <div className='row justify-content-center'>
            <div className='col-lg-10'>
              <form>
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
                      <Form.Control.Feedback type='invalid'>
                        <p className='text-danger'>{errors?.titulo?.message}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className='col-12'>
                    <Form.Group>
                      <Form.Label>Descripción:</Form.Label>
                      <Form.Control
                        as='textarea'
                        name='descripcion'
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

                <div className='form-group'>
                  <DataTable
                    className='p-datatable-gridlines p-datatable-sm border border-secondary'
                    value={videos}
                    header={header}
                    reorderableColumns
                    onRowReorder={onReorder}
                    emptyMessage={
                      <div className='text-center my-3'>
                        <strong>No hay videos Agregados</strong>
                        <br />
                        <strong>
                          Pulse en el boton Agregar para añadir un nuevo video a
                          la lista
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
                          videos={videos}
                          setVideos={setVideos}
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
                          videos={videos}
                          setVideos={setVideos}
                        />
                      )}
                    />
                  </DataTable>
                </div>

                <Row className='justify-content-around mb-5'>
                  <div className='col-md-3'>
                    <Link href='/playlist'>
                      <a className='btn btn-block btn-danger'>Cancelar</a>
                    </Link>
                  </div>
                  <div className='col-md-3'>
                    <Button variant='success' type='button' block>
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
  const { register, errors, handleSubmit } = methods;

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

    if (!isDelete) {
      videos.push({ ...formData, ...data });
    }

    setVideos(mappVideos(videos));

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
            <Button onClick={onClick}>Cerrar</Button>
            <Button
              type='submit'
              variant={isDelete ? "danger" : "success"}
              onClick={handleSubmit(onSubmit)}>
              {isDelete ? "Eliminar" : "Guardar"}
            </Button>
          </Modal.Footer>
        </Modal>
      </FormProvider>
    </React.Fragment>
  );
};

const ModalVideo = ({ video }) => {
  const [show, setShow] = useState(false);

  const onHide = () => {
    setShow(!show);
  };

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
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        onHide={onHide}
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <YouTube
            className='text-center'
            videoId={video.url} // defaults -> null
            //id={string} // defaults -> null
            //className={string} // defaults -> null
            //containerClassName={string} // defaults -> ''
            //opts={obj} // defaults -> {}
            //onReady={func} // defaults -> noop
            //onPlay={func} // defaults -> noop
            //onPause={func} // defaults -> noop
            //onEnd={func} // defaults -> noop
            //onError={func} // defaults -> noop
            //onStateChange={func} // defaults -> noop
            //onPlaybackRateChange={func} // defaults -> noop
            //onPlaybackQualityChange={func} // defaults -> noop
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
