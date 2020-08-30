import { useMutation } from "@apollo/client";
import PublicLayout from "@layouts/publicLayout";
import { Usuario } from "@services/Usuario.service";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm({ mode: "onChange" });
  const { addToast } = useToasts();
  const router = useRouter();
  const [login] = useMutation(Usuario.login);

  useEffect(() => {
    const usuario = Usuario.getUsuarioStorage();
    if (usuario) {
      router.push("/dashboard");
    }
  }, []);

  const onSubmit = async (input) => {
    setLoading(true);

    const { data } = await login({ variables: { ...input } });
    //SUPONIENDO SE HAC UNA PETICION
    //Y EL USUARIO ESTA BLOQUEADO

    const { tokenAuth } = data;

    if (!tokenAuth.errors) {
      Usuario.guardarUsuarioStorage(tokenAuth.user);
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <PublicLayout title="Login">
      <main>
        <div className="container">
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
                      ref={register({ required: "Este campo es obligatorio" })}
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
                      ref={register({ required: "Este campo es obligatorio" })}
                      isInvalid={!!errors.password}
                      type="password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password && errors.password.message}
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading && "Ingresando..."}
                      {!loading && "Ingresar"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Login;
