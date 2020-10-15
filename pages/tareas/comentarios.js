import Comentario from "@components/tareas/Comentario";
import PrivateLayout from "@layouts/privateLayout";
import { Tarea } from "@services/Tareas.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ComentariosTareaContainer = ({ id }) => {
  const [tarea, setTarea] = useState(null);

  const methods = useForm({ mode: "onChange" });

  useEffect(() => {
    Tarea.getById(id, (data) => {
      setTarea(data);
    });
  }, []);

  const enviarComentario = async (data) => {
    methods.reset();
    Tarea.addComentario(id, data);
  };

  const router = useRouter();

  const onClickRegresar = () => {
    router.push("/tareas");
  };

  return (
    <PrivateLayout>
      <main className='container my-5'>
        <h1 className='display-4'>Tarea: {tarea?.titulo}</h1>
        <h5>Fecha de envio: {tarea?.fechaEnvio}</h5>
        <h5>Fecha de entrega: {tarea?.fechaEntrega}</h5>
        <h5>Descripcion:</h5>

        <div className='row justify-content-center'>
          <div className='col-12'>
            <div className='p-5 border border-dark'>
              <div dangerouslySetInnerHTML={{ __html: tarea?.descripcion }} />
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <h3>Comentarios:</h3>

          <div className='col-12 my-5'>
            {tarea?.comentarios?.map((e, index) => (
              <Comentario idDoc={id} data={e} key={index} />
            ))}
          </div>
          <div className='col-12'>
            <form onSubmit={methods.handleSubmit(enviarComentario)}>
              <h5>Agregar Comentario</h5>
              <div class='form-group'>
                <Form.Control
                  as='textarea'
                  name='comentario'
                  id='name'
                  class='form-control'
                  placeholder='Ingresa tu comentario con respecto a la tarea'
                  isInvalid={!!methods.errors.comentario}
                  rows='6'
                  ref={methods.register({
                    required: "Este campo es obligatorio",
                  })}
                />

                <Form.Control.Feedback type='invalid'>
                  {methods?.errors?.comentario?.message}
                </Form.Control.Feedback>
              </div>

              <div className='form-row justify-content-end'>
                <div className='col-md-4 text-right my-2'>
                  <button
                    className='btn btn-danger btn-block'
                    type='button'
                    onClick={onClickRegresar}>
                    Regresar
                  </button>
                </div>
                <div className='col-md-4 text-right my-2'>
                  <button className='btn btn-success btn-block' type='submit'>
                    Enviar comentario
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

ComentariosTareaContainer.getInitialProps = ({ query }) => {
  return query;
};

export default ComentariosTareaContainer;
