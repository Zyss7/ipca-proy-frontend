import React, { useEffect } from "react";
import PrivateLayout from "@layouts/privateLayout";
import { useForm, FormProvider } from "react-hook-form";
import MensajesForm from "@components/mensajes/mensajesForm";

const CreateMensajeContainer = () => {
  const methods = useForm({ mode: "onChange" });

  const onEnviar = async (input) => {
    console.log(input);
  };
  return (
    <PrivateLayout>
      <FormProvider {...methods} onEnviar={onEnviar}>
        <MensajesForm title="Crear Mensaje" />
      </FormProvider>
    </PrivateLayout>
  );
};

export default CreateMensajeContainer;
