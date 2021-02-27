import { StyledContainer } from '@components/containers/StyledContainer';
import PublicLayout from '@layouts/publicLayout';
import { Usuario } from '@services/Usuario.service';
import useUsuario from 'hooks/useUsuario';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange' });

  const router = useRouter();
  const { login, logout } = useUsuario();
  const { addToast } = useToasts();

  useEffect(() => {
    const usuarioLocal = Usuario.getUsuarioStorage();
    if (usuarioLocal) {
      router.push('/dashboard');
    }
  }, []);

  /**
   *
   * @param {{username:string, password:string}} input
   */

  const onSubmit = async (input) => {
    console.log(input);
    input.username = input.username.trim();
    input.password = input.password.trim();
    try {
      setLoading(true);
      const res = await login(input);

      if (res?.transaccion === true) {
        return router.push('/dashboard');
      }

      addToast(res?.error?.mensaje, { appearance: 'warning' });
    } catch (error) {
      console.log(error);
      addToast('Ha ocurrido un problema al realizar el login', { appearance: 'warning' });
    }

    setLoading(false);
  };

  return (
    <PublicLayout title="Login">
      <StyledContainer fullHeight>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-11 col-md-11">
              <div className="row mt-5 justify-content-center border border-dark">
                <div className="col-md-6 align-self-center">
                  <img
                    className="img-fluid w-100 h-100"
                    src="/img/LogoIPCA.jpg"
                    alt="Logo"
                  />
                </div>

                <div className="col-md-6  ">
                  <h1 className="text-center display-4">Iniciar Sesión</h1>

                  <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row justify-content-center">
                      <div className="form-group col-12">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                          name="username"
                          ref={register({
                            required: 'Este campo es obligatorio',
                          })}
                          //isInvalid={errors.usuario !== undefined}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username && errors.username.message}
                        </Form.Control.Feedback>
                      </div>

                      <div className="form-group col-12">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          name="password"
                          ref={register({
                            required: 'Este campo es obligatorio',
                          })}
                          isInvalid={!!errors.password}
                          type="password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password && errors.password.message}
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                          {loading && 'Ingresando...'}
                          {!loading && 'Ingresar'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledContainer>
    </PublicLayout>
  );
};

export default Login;
