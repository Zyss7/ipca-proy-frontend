import React from "react";
import { Form, Row, Button } from "react-bootstrap";

const TareasForm = () => {
  return (
    <React.Fragment>
      <Form>
        <Row>
          <Form.Label>Tarea:</Form.Label>
          <Form.Control />
          <Form.Label>Descripción:</Form.Label>
          <Form.Control />
        </Row>
        <Row>
          <Button variant="success">Guardar</Button>
          <Button variant="danger">Cancelar</Button>
          <Button variant="info">Enviar</Button>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default TareasForm;
