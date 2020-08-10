import React, { useEffect } from "react";
import PrivateLayout from "@layouts/privateLayout";
import { useForm, FormProvider } from "react-hook-form";
import TareasForm from "@components/tareas/tareasForm";

const CreateTareaContainer = () => {
  const methods = useForm({ mode: "onChange" });

  const onGuardar = async (input) => {
    console.log(input);
  };
  const onEnviar = async (input) => {
    console.log(input);
  };
  return (
    <PrivateLayout>
      <FormProvider {...methods} onGuardar={onGuardar} onEnviar={onEnviar}>
        <TareasForm title="Crear Tarea" />
      </FormProvider>
    </PrivateLayout>
  );
};

export default CreateTareaContainer;
