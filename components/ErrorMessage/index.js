import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const CustomErrorMessage = ({ name }) => {
  const { errors } = useFormContext();
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p className='text-danger'>{message}</p>}
    />
  );
};

export default CustomErrorMessage;
