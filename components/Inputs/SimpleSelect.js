import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

const SimpleSelect = ({ options = [], name, label, rules }) => {
  const { register, errors } = useFormContext();
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        ref={register(rules)}
        isInvalid={!!errors[name]}
      >
        <option value="">-----SELECCIONE-----</option>
        {options.map((e, index) => (
          <option value={e.value} key={index}>
            {e.label}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        <p className="text-danger">{errors[name]?.message}</p>
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default SimpleSelect;
