import { Usuario } from "@services/Usuario.service";
import React, { useContext, useState } from "react";

const UsuarioContext = React.createContext(null);

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isUsuarioLoading, setIsUsuarioLoading] = useState(true);

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, isUsuarioLoading, setIsUsuarioLoading }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);

  const setter = (usuarioValue) => {
    setUsuario(usuarioValue);
  };

  return [usuario, setter];
};

export const useUsuarioIsLoading = () => {
  const { isUsuarioLoading, setIsUsuarioLoading } = useContext(UsuarioContext);
  return [isUsuarioLoading, setIsUsuarioLoading];
};
