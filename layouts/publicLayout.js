import React from "react";
import Head from "next/head";

const PublicLayout = ({ children, title }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title || "MyLittleApp"}</title>
        <link
          href='https://cdn.syncfusion.com/ej2/material.css'
          rel='stylesheet'
        />
      </Head>
      {children}
    </React.Fragment>
  );
};

export default PublicLayout;
