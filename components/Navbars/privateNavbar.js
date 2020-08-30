import React from "react";
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { Usuario } from "@services/Usuario.service";

const PrivateNavbar = () => {
  const router = useRouter();

  const loggout = () => {
    Usuario.logoutUsuario();
    router.push("/login");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="primary"
      variant="dark"
      sticky="top"
      className="mb-3"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/dashboard">
            <Nav.Link as="a">Inicio</Nav.Link>
          </Link>
          <Link href="/tareas">
            <Nav.Link as="a">Tareas</Nav.Link>
          </Link>

          <Link href="/mensajes">
            <Nav.Link as="a">Mensajes</Nav.Link>
          </Link>

          <NavDropdown title="Personas" id="collasible-nav-dropdown">
            <Link href="/personas">
              <NavDropdown.Item as="a">Personas</NavDropdown.Item>
            </Link>

            <Link href="/docentes">
              <NavDropdown.Item as="a">Docentes</NavDropdown.Item>
            </Link>

            <Link href="/paginas/inicio">
              <NavDropdown.Item as="a">Alumnos</NavDropdown.Item>
            </Link>
          </NavDropdown>

          <Nav className="float-right">
            <Button variant="outline-light" onClick={loggout}>
              Cerrar Sesión
            </Button>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PrivateNavbar;
