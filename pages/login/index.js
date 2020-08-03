import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PublicLayout from "@layouts/publicLayout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm({ mode: "onChange" });
  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("DATA: ", data);

    //SUPONIENDO SE HAC UNA PETICION
    //Y EL USUARIO ESTA BLOQUEADO
    if (data.usuario === "Andres") {
      setLoading(false);
      addToast("ESTE USUARIO ESTA BLOQUEADO", {
        appearance: "error",
      });
      return;
    }

    setInterval(() => {
      router.push("/");
      setLoading(false);
    }, 3000);
  };

  console.log("ERORRES: ", errors);

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
                      name="usuario"
                      ref={register({ required: "Este campo es obligatorio" })}
                      //isInvalid={errors.usuario !== undefined}
                      isInvalid={!!errors.usuario}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.usuario && errors.usuario.message}
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
