import { Usuario } from "@services/Usuario.service";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";

const PrivateNavbar = () => {
  const router = useRouter();

  const loggout = () => {
    Usuario.logoutUsuario();
    router.push("/login");
  };

  return (
    <Navbar
      collapseOnSelect
      expand='sm'
      bg='dark'
      variant='dark'
      sticky='top'
      className='mb-3'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Link href='/dashboard'>
            <Nav.Link as='a' className='pointer'>
              Inicio
            </Nav.Link>
          </Link>
          <Link href='/tareas'>
            <Nav.Link as='a' className='pointer'>
              Tareas
            </Nav.Link>
          </Link>

          <Link href='/mensajes'>
            <Nav.Link as='a' className='pointer'>
              Mensajes
            </Nav.Link>
          </Link>

          <Link href='/playlist'>
            <Nav.Link as='a' className='pointer'>
              Playlist
            </Nav.Link>
          </Link>

          <NavDropdown title='Información' id='collasible-nav-dropdown'>
            <Link href='/docentes'>
              <NavDropdown.Item as='a' className='pointer'>
                Docentes
              </NavDropdown.Item>
            </Link>

            <Link href='/paginas/inicio'>
              <NavDropdown.Item as='a' className='pointer'>
                Alumnos
              </NavDropdown.Item>
            </Link>
          </NavDropdown>

          <Nav className='float-right'>
            <Button variant='outline-light' onClick={loggout}>
              Cerrar Sesión
            </Button>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PrivateNavbar;
