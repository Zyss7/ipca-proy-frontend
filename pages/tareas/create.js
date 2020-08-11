import React, { useEffect, useState } from "react";
import PrivateLayout from "@layouts/privateLayout";
import { useForm, FormProvider } from "react-hook-form";
import TareasForm from "@components/tareas/tareasForm";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";

const CreateTareaContainer = () => {
  const methods = useForm({ mode: "onChange" });
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tarea = localStorage.getItem("tarea");
    if (tarea) {
      methods.reset(JSON.parse(tarea));
    }
    console.log(methods.getValues());
    const data = _.differenceBy(
      [
        { id: 54464, alumno: "Alejandro Coraizaca | M5A" },
        { id: 12312321, alumno: "Alejandro asadf Coraizaca | M5A" },
        { id: 451325234, alumno: "Alejandro 5643 Coraizaca | M5A" },
      ],
      methods.getValues("alumnos") || [],
      "id"
    );

    console.log(data);
  }, []);

  const onGuardar = async (input) => {
    console.log(input);
    localStorage.setItem("tarea", JSON.stringify(input));

    addToast("Se ha guardado la tarea.", {
      appearance: "success",
    });
  };
  const onEnviar = async (input) => {
    console.log(input);
  };
  return (
    <PrivateLayout>
      <FormProvider {...methods} onGuardar={onGuardar} onEnviar={onEnviar}>
        <TareasForm
          title="Crear Tarea"
          almns={_.differenceBy(
            [
              { id: 54464, alumno: "Alejandro Coraizaca | M5A" },
              { id: 12312321, alumno: "Alejandro asadf Coraizaca | M5A" },
              { id: 451325234, alumno: "Alejandro 5643 Coraizaca | M5A" },
            ],
            methods.getValues("alumnos") || [],
            "id"
          )}
        />
      </FormProvider>
    </PrivateLayout>
  );
};

export default CreateTareaContainer;
