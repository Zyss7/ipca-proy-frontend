import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import { Usuario } from "@services/Usuario.service";
import { useUsuario, useUsuarioIsLoading } from "context/UsuarioContext";
import React, { useCallback, useEffect } from "react";

const whitAuth = (Component) => (props) => {
  const [isLoading, setIsLoading] = useUsuarioIsLoading();
  const [usuario, setUsuario] = useUsuario();
  const init = useCallback(async () => {
    setIsLoading(true);
    if (!usuario) {
      const response = await Usuario.getInfoUsuario();
      setUsuario(response);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  if (isLoading && !usuario) {
    return <LoadingWrapper loading={isLoading}></LoadingWrapper>;
  }

  return usuario && <Component {...props} />;
};

export default whitAuth;
