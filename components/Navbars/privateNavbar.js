import useUsuario from 'hooks/useUsuario';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

const PrivateNavbar = () => {
  const router = useRouter();

  const { logout } = useUsuario();

  const onClickLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
      sticky="top"
      className="mb-3"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto d-flex flex-row justify-content-around w-100">
          <Link href="/dashboard">
            <Nav.Link as="a" className="pointer">
              Inicio
            </Nav.Link>
          </Link>
          <Link href="/tareas">
            <Nav.Link as="a" className="pointer">
              Tareas
            </Nav.Link>
          </Link>

          <Link href="/playlist">
            <Nav.Link as="a" className="pointer">
              Playlist
            </Nav.Link>
          </Link>

          <div className="ml-auto d-flex flex-row">
            {/* <NavDropdown title='Informacion' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <Button variant="outline-light " onClick={onClickLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PrivateNavbar;
