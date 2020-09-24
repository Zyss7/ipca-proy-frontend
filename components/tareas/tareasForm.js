import React from "react";
import { useFormContext } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

const TareasForm = ({ title, onGuardar, onEnviar }) => {
  const { register, errors, onGuardar, handleSubmit } = useFormContext();
  const { addToast } = useToasts();

  const onSubmitError = () => {
    addToast("RELLENE CORRECTAMENTE EL FORMULARIO", {
      appearance: "error",
    });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return <React.Fragment></React.Fragment>;
};

export default TareasForm;
