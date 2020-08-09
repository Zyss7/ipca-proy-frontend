import React from "react";
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap";
import Link from "next/link";

const PrivateNavbar = () => {
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
          <Link href="/">
            <Nav.Link as="a">Inicio</Nav.Link>
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
            <Button variant="outline-light">Cerrar Sesión</Button>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PrivateNavbar;
