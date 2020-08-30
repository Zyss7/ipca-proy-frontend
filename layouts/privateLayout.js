import React, { useEffect } from "react";
import Head from "next/head";
import PrivateNavbar from "@components/Navbars/privateNavbar";
import { Usuario } from "@services/Usuario.service";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";

const PrivateLayout = ({ children, title }) => {
  const router = useRouter();
  const { addToast } = useToasts();
  useEffect(() => {
    const usuario = Usuario.getUsuarioStorage();
    if (!usuario) {
      addToast("DEBE INICIAR SESION!", { appearance: "warning" });
      router.push("/login");
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{title || "MyLittleApp"}</title>
      </Head>
      <PrivateNavbar />
      {children}
    </React.Fragment>
  );
};

export default PrivateLayout;
