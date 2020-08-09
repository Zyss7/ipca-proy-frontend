import React from "react";
import Head from "next/head";
import PrivateNavbar from "@components/Navbars/privateNavbar";

const PrivateLayout = ({ children, title }) => {
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
