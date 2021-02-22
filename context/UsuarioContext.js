import React, { useState } from 'react';

export const UsuarioContext = React.createContext({ usuario: null, setUsuario: null });

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isUsuarioLoading, setIsUsuarioLoading] = useState(true);

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, isUsuarioLoading, setIsUsuarioLoading }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
