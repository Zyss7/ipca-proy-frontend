import React from "react";
import Head from "next/head";

const PublicLayout = ({ children, title }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title || "MyLittleApp"}</title>
      </Head>
      {children}
    </React.Fragment>
  );
};

export default PublicLayout;
