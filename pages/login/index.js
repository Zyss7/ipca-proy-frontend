import { useMutation } from "@apollo/client";
import PublicLayout from "@layouts/publicLayout";
import { Usuario } from "@services/Usuario.service";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const { register, errors, handleSubmit } = useForm({ mode: "onChange" });

  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [showError, setShowError] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const router = useRouter();
  const [login] = useMutation(Usuario.login);
  const { addToast } = useToasts();

  useEffect(() => {
    const usuarioLocal = Usuario.getUsuarioStorage();
    if (usuarioLocal) {
      router.push("/dashboard");
    }
  }, []);

  const onSubmit = async (input) => {
    setLoading(true);

    const { data } = await login({ variables: { ...input } });

    const { tokenAuth } = data;

    if (!tokenAuth.errors) {
      const { user } = tokenAuth;
      if (user.grupos) {
        const isValid = user.grupos.filter(
          (grupo) => grupo.nombre === "DOCENTE" || grupo.nombre === "ALUMNO"
        );

        if (isValid.length > 0) {
          if (isValid.length > 1) {
            setUsuario(user);
            setModalShow(true);
            setGrupos(isValid);
          } else {
            const defaultGrupo = isValid[0];
            user.grupoSeleccionado = defaultGrupo;
            user.grupoStr = defaultGrupo.nombre;

            Usuario.guardarUsuarioStorage(user);
            router.push("/dashboard");
          }
        } else {
          addToast("SOLO PUEDEN INGRESAR ALUMNOS Y DOCENTES", {
            appearance: "error",
          });
        }
      }
    } else {
      addToast("POR FAVOR VERIFICA TUS CREDENCIALES", {
        appearance: "error",
      });
    }

    setLoading(false);
  };

  const onClickContinuar = () => {
    if (grupoSeleccionado) {
      usuario.grupoSeleccionado = grupoSeleccionado;
      usuario.grupoStr = grupoSeleccionado.nombre;
      Usuario.guardarUsuarioStorage(usuario);
      router.push("/dashboard");
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <PublicLayout title='Login'>
      <div className='container'>
        <div className='row mt-5 justify-content-center border border-dark'>
          <div className='col-md-6 align-self-center'>
            <img
              className='img-fluid w-100 h-100'
              src='/img/LogoIPCA.jpg'
              alt='Logo'
            />
          </div>

          <div className='col-md-6  '>
            <h1 className='text-center display-4'>Iniciar Sesión</h1>

            <form className='my-5' onSubmit={handleSubmit(onSubmit)}>
              <div className='form-row justify-content-center'>
                <div className='form-group col-12'>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    name='username'
                    ref={register({ required: "Este campo es obligatorio" })}
                    //isInvalid={errors.usuario !== undefined}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.username && errors.username.message}
                  </Form.Control.Feedback>
                </div>

                <div className='form-group col-12'>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    name='password'
                    ref={register({ required: "Este campo es obligatorio" })}
                    isInvalid={!!errors.password}
                    type='password'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password && errors.password.message}
                  </Form.Control.Feedback>
                </div>
                <div className='col-12'>
                  <button
                    className='btn btn-primary btn-block'
                    disabled={loading}>
                    {loading && "Ingresando..."}
                    {!loading && "Ingresar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        backdrop='static'
        keyboard={false}>
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            Seleccione
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4></h4>
          <div className='p-fluid'>
            <div className='p-field'>
              <label htmlFor='grupo'>
                Estimado usuario por favor seleccione como desea iniciar sesion
              </label>
              <Dropdown
                id='grupo'
                options={grupos}
                value={grupoSeleccionado}
                className={classNames({
                  "p-invalid": showError,
                })}
                optionLabel='nombre'
                placeholder='SELECCIONE UN VALOR DE LA LISTA'
                onChange={({ value }) => {
                  setShowError(false);
                  setGrupoSeleccionado(value);
                }}
              />
              {showError && (
                <small id='grupo-help' className='p-invalid'>
                  Debe seleccionar un valor para poder continuar
                </small>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClickContinuar}>Continuar</Button>
        </Modal.Footer>
      </Modal>
    </PublicLayout>
  );
};

export default Login;
