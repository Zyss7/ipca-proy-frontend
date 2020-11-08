import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PrivateNavbar from "@components/Navbars/privateNavbar";
import { Usuario } from "@services/Usuario.service";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import { useUsuario, useUsuarioIsLoading } from "context/UsuarioContext";

const PrivateLayout = ({ children, title }) => {
  const router = useRouter();
  const { addToast } = useToasts();

  const [usuario, setUsuario] = useUsuario();
  const [isLoading, setIsLoading] = useUsuarioIsLoading();

  const init = useCallback(async () => {
    setIsLoading(true);
    if (!usuario) {
      const response = await Usuario.getInfoUsuario();
      setUsuario(response);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const isLoggedIn = Usuario.getUsuarioStorage();
    if (!isLoggedIn) {
      addToast("DEBE INICIAR SESION!", { appearance: "warning" });
      router.push("/login");
    } else {
      init();
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{title || "MyLittleApp"}</title>
      </Head>
      <LoadingWrapper loading={isLoading}>
        <PrivateNavbar />
        {children}
      </LoadingWrapper>
    </React.Fragment>
  );
};

export default PrivateLayout;
